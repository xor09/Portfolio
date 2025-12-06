import {
  Box,
  Text,
  HStack,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  Tag,
  TagLabel,
  useColorModeValue,
} from "@chakra-ui/react";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { dockElements } from "../constants";

const MotionContent = motion(ModalContent);

const PROMPT = "bishal@terminal";
const QUICK_COMMANDS = ["help", "skills", "projects", "metrics", "contact", "clear"];

type LineType = "input" | "output" | "system";

interface TerminalLine {
  id: number;
  type: LineType;
  text: string;
}

export const TerminalPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [command, setCommand] = useState("");
  const [lines, setLines] = useState<TerminalLine[]>([]);

  const inputRef = useRef<any>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const bgColor = useColorModeValue(
    "rgba(255,255,255,0.95)",
    "rgba(15,15,20,0.95)"
  );
  const borderColor = useColorModeValue(
    "rgba(0,100,80,0.2)",
    "rgba(0,255,136,0.2)"
  );

  // -----------------------------
  // OPEN/CLOSE HANDLERS
  // -----------------------------
  useEffect(() => {
    const openHandler = () => setIsOpen(true);
    const closeHandler = () => setIsOpen(false);

    window.addEventListener("open-terminal", openHandler);
    window.addEventListener("close-terminal", closeHandler);

    return () => {
      window.removeEventListener("open-terminal", openHandler);
      window.removeEventListener("close-terminal", closeHandler);
    };
  }, []);

  // Autofocus input
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 80);
    }
  }, [isOpen]);

  // Auto scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  // Startup boot text
  useEffect(() => {
    const boot = [
      "Booting Bishal's trading terminal...",
      "Low-latency mode activated.",
      "Type `help` to explore commands.",
    ];
    setLines(boot.map((t, i) => ({ id: i, type: "system", text: t })));
  }, []);

  // -----------------------------
  // Utility: Append line
  // -----------------------------
  const generateId = () => Date.now() + Math.random();

  const addLine = (type: LineType, text: string) => {
    setLines((prev) => [
      ...prev,
      { id: generateId(), type, text }
    ]);
  };

  // -----------------------------
  // TYPING EFFECT
  // -----------------------------
  const typeLine = async (text: string) => {
  let output = "";
  const id = generateId();  // unique id for this line

  // Insert an empty line to start typing into
  setLines((prev) => [...prev, { id, type: "output", text: "" }]);

  for (let i = 0; i < text.length; i++) {
    output += text[i];
    await new Promise((res) => setTimeout(res, 8));

    setLines((prev) =>
      prev.map((line) =>
        line.id === id ? { ...line, text: output } : line
      )
    );
  }
};


  const handleCommand = async (cmd: string) => {
    const lower = cmd.trim().toLowerCase();
    addLine("input", `${PROMPT} % ${cmd}`);

    if (!cmd.trim()) return;

    if (lower === "clear") {
      setLines([]);
      return;
    }

    const responses: Record<string, string[]> = {
      help: [
        "Available commands:",
        " help      - Show commands",
        " skills    - Show tech stack",
        " projects  - Show projects",
        " metrics   - Open system metrics",
        " contact   - Contact info",
        " clear     - Clear terminal",
      ],
      skills: [
        "Core skills:",
        " • React, TS, Electron",
        " • Node, PostgreSQL, Sequelize",
        " • WebSocket, WebRTC real-time apps",
        " • HFT-style low-latency systems",
      ],
      projects: [
        "Projects:",
        " • Trading Terminal (Electron + WebSocket)",
        " • Remote Interview Platform",
        " • Live OMS/RMS dashboards",
      ],
      contact: [
        "Let's connect:",
        " • Use Spotlight → contact",
      ],
      metrics: [
        "Opening metrics panel...",
      ],
    };

    if (lower in responses) {
      for (let r of responses[lower]) {
        addLine("output", ""); // placeholder
        await typeLine(r);
      }

      if (lower === "metrics") {
        window.dispatchEvent(new Event("open-metrics-popup"));
      }

      return;
    }

    // Fallback
    addLine("output", "");
    await typeLine(`zsh: command not found: ${cmd}`);
  };

  // Form submit
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const c = command;
    setCommand("");
    handleCommand(c);
  };

  // Quick command click
  const runQuick = (cmd: string) => {
    setCommand("");
    handleCommand(cmd);
  };

  return (
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        isCentered
        onOverlayClick={() => setIsOpen(false)}
        onCloseComplete={() =>{ 
                window.dispatchEvent(new CustomEvent("bottom-dock-event", {
                   detail : {
                     close : dockElements.TERMINAL
                   }
                }))
            }
        }
      >
    <AnimatePresence>
      {isOpen && (
        <>
          <ModalOverlay bg="rgba(0,0,0,0.7)" backdropFilter="blur(10px)" />

          <MotionContent
            bg={bgColor}
            borderRadius="2xl"
            border="1px solid"
            borderColor={borderColor}
            maxW="700px"
            mx={4}
            p={6}
            overflow="hidden"
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.18 }}
          >
            {/* Window header */}
            <HStack mb={4}>
              <Box w="12px" h="12px" bg="#ff5f57" borderRadius="full" />
              <Box w="12px" h="12px" bg="#febc2e" borderRadius="full" />
              <Box w="12px" h="12px" bg="#28c840" borderRadius="full" />
            </HStack>

            {/* Quick commands */}
            <HStack spacing={2} mb={3}>
              {QUICK_COMMANDS.map((cmd) => (
                <Tag
                  key={cmd}
                  size="sm"
                  borderRadius="full"
                  bg="rgba(0,255,136,0.1)"
                  border="1px solid rgba(0,255,136,0.3)"
                  cursor="pointer"
                  onClick={() => runQuick(cmd)}
                >
                  <TagLabel color="brand.green">{cmd}</TagLabel>
                </Tag>
              ))}
            </HStack>

            {/* Lines */}
            <Box
              maxH="300px"
              overflowY="auto"
              fontFamily="mono"
              fontSize="sm"
              color="brand.green"
            >
              {lines.map((l) => (
                <Text key={l.id} whiteSpace="pre-wrap">
                  {l.text}
                </Text>
              ))}
              <div ref={bottomRef} />
            </Box>

            {/* Input */}
            <form onSubmit={handleSubmit}>
              <HStack mt={3}>
                <Text color="brand.green">{PROMPT} %</Text>
                <Input
                  ref={inputRef}
                  value={command}
                  onChange={(e) => setCommand(e.target.value)}
                  variant="unstyled"
                  placeholder="type a command..."
                  fontFamily="mono"
                />
              </HStack>
            </form>
          </MotionContent>
        </>
      )}
    </AnimatePresence>
      </Modal>
  );
};
