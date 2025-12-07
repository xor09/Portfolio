import {
  Box,
  Text,
  HStack,
  VStack,
  Button,
  useColorModeValue,
  Select,
  Textarea,
  Badge,
  Spinner,
  Flex,
  IconButton,
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { FiX } from "react-icons/fi";
import Editor from "@monaco-editor/react";

const MotionBox = motion(Box);

type Language = "javascript" | "typescript" | "python" | "cpp";

type RunResult = {
  stdout: string;
  stderr: string;
  timeMs?: number;
  memoryMb?: number;
  exitCode?: number;
};

const DEFAULT_SNIPPETS: Record<Language, string> = {
  javascript: `// JS: Example
function solve(input) {
  const n = Number(input.trim() || 5);
  return Array.from({ length: n }, (_, i) => i + 1).join(" ");
}

const fs = require("fs");
const input = fs.readFileSync(0, "utf8");
process.stdout.write(solve(input) + "\\n");`,
  typescript: `// TS: Example
function solve(input: string): string {
  const n = Number(input.trim() || 5);
  return Array.from({ length: n }, (_, i) => i + 1).join(" ");
}

import * as fs from "fs";
const input = fs.readFileSync(0, "utf8");
process.stdout.write(solve(input) + "\\n");`,
  python: `# Python: Example
import sys

def solve(data: str) -> str:
    data = data.strip() or "5"
    n = int(data)
    return " ".join(str(i) for i in range(1, n+1))

if __name__ == "__main__":
    input_data = sys.stdin.read()
    sys.stdout.write(solve(input_data) + "\\n")`,
  cpp: `// C++: Example
#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n = 5;
    if (!(cin >> n)) {
        n = 5;
    }
    for (int i = 1; i <= n; ++i) {
        cout << i << (i == n ? '\\n' : ' ');
    }
    return 0;
}`,
};

export const CodeSandboxFullscreen = () => {
  // ---------- STATE HOOKS ----------
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState<Language>("javascript");
  const [code, setCode] = useState<string>(DEFAULT_SNIPPETS.javascript);
  const [stdin, setStdin] = useState<string>("5\n");
  const [isRunning, setIsRunning] = useState(false);
  const [result, setResult] = useState<RunResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  // ---------- THEME HOOKS (ALWAYS TOP-LEVEL, FIX ORDER) ----------
  const bg = useColorModeValue("#f5f7fa", "#050510");
  const panelBg = useColorModeValue(
    "rgba(255,255,255,0.06)",
    "rgba(10,10,20,0.95)"
  );
  const borderColor = useColorModeValue(
    "rgba(0,100,80,0.25)",
    "rgba(0,255,136,0.25)"
  );
  const stdinBg = useColorModeValue("gray.50", "rgba(0,0,0,0.35)");
  const outputBg = useColorModeValue("gray.900", "rgba(3,3,8,0.97)");

  // ---------- EFFECTS (ORDER NEVER CHANGES) ----------

  // open / close via custom events
  useEffect(() => {
    const openHandler = () => setIsOpen(true);
    const closeHandler = () => setIsOpen(false);

    window.addEventListener("open-sandbox", openHandler);
    window.addEventListener("close-sandbox", closeHandler);

    return () => {
      window.removeEventListener("open-sandbox", openHandler);
      window.removeEventListener("close-sandbox", closeHandler);
    };
  }, []);

  // ESC to close
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        handleClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", onKeyDown);
      return () => window.removeEventListener("keydown", onKeyDown);
    }
  }, [isOpen]);

  // Reset snippet when language changes
  useEffect(() => {
    setCode(DEFAULT_SNIPPETS[language]);
    setResult(null);
    setError(null);
  }, [language]);

  // ---------- MEMO (ALWAYS LAST HOOK) ----------
  const statusBadge = useMemo(() => {
    if (!result && !error) return null;
    if (error) {
      return (
        <Badge colorScheme="red" borderRadius="full">
          client-error
        </Badge>
      );
    }
    if (result?.exitCode === 0) {
      return (
        <Badge colorScheme="green" borderRadius="full">
          success
        </Badge>
      );
    }
    return (
      <Badge colorScheme="red" borderRadius="full">
        failed
      </Badge>
    );
  }, [result, error]);

  // ---------- HANDLERS ----------
  const handleRun = async () => {
    if (!code.trim()) return;
    setIsRunning(true);
    setResult(null);
    setError(null);

    try {
      const res = await fetch("/api/run-sandbox", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          language,
          code,
          stdin,
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `HTTP ${res.status}`);
      }

      const data = await res.json();
      setResult({
        stdout: data.stdout ?? "",
        stderr: data.stderr ?? "",
        timeMs: data.timeMs,
        memoryMb: data.memoryMb,
        exitCode: data.exitCode,
      });
    } catch (e: any) {
      console.error("Sandbox run error:", e);
      setError(e?.message || "Failed to run code");
    } finally {
      setIsRunning(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    // notify bottom dock to reset active state
    window.dispatchEvent(
      new CustomEvent("bottom-dock-event", {
        detail: { close: "sandbox" },
      })
    );
  };

  // ---------- RENDER ----------
  return (
    <AnimatePresence>
      {isOpen && (
        <MotionBox
          position="fixed"
          inset="0"
          zIndex={5000}
          bg={bg}
          backgroundImage={
            "radial-gradient(circle at 0 0, rgba(0,255,136,0.08), transparent 55%), radial-gradient(circle at 100% 100%, rgba(0,212,255,0.1), transparent 55%)"
          }
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* subtle grid overlay */}
          <Box
            position="absolute"
            inset="0"
            opacity={0.08}
            pointerEvents="none"
            backgroundImage={
              "linear-gradient(transparent 95%, rgba(0,255,136,0.25) 96%), linear-gradient(90deg, transparent 95%, rgba(0,255,136,0.25) 96%)"
            }
            backgroundSize="24px 24px"
          />

          <Flex
            position="relative"
            direction="column"
            h="100%"
            px={{ base: 3, md: 8 }}
            py={{ base: 3, md: 5 }}
            gap={3}
          >
            {/* Top bar */}
            <HStack justify="space-between" align="center">
              <HStack spacing={4}>
                <Box>
                  <Text
                    fontFamily="mono"
                    fontSize="xs"
                    color="brand.green"
                  >
                    // Docker Sandbox Playground
                  </Text>
                  <Text fontSize="xs" color="gray.500">
                    Executes your code in an isolated container (demo mode).
                  </Text>
                </Box>
                {statusBadge}
              </HStack>

              <HStack spacing={4}>
                <HStack spacing={2} fontSize="10px" color="gray.500">
                  <Box
                    w="8px"
                    h="8px"
                    borderRadius="full"
                    bg={isRunning ? "brand.red" : "brand.green"}
                    boxShadow={
                      isRunning
                        ? "0 0 12px rgba(255,59,92,0.9)"
                        : "0 0 12px rgba(0,255,136,0.9)"
                    }
                  />
                  <Text fontFamily="mono">
                    env:
                    <Text as="span" color="brand.cyan">
                      {" "}
                      docker-sandbox
                    </Text>
                  </Text>
                </HStack>

                <IconButton
                  aria-label="Close sandbox"
                  icon={<FiX />}
                  size="sm"
                  variant="ghost"
                  onClick={handleClose}
                />
              </HStack>
            </HStack>

            {/* Main panel */}
            <Flex
              flex="1"
              minH="0"
              borderRadius="2xl"
              border="1px solid"
              borderColor={borderColor}
              bg={panelBg}
              backdropFilter="blur(18px)"
              boxShadow="0 25px 60px -15px rgba(0,0,0,0.85), 0 0 40px rgba(0,255,136,0.3)"
              p={4}
              gap={4}
              direction={{ base: "column", md: "row" }}
            >
              {/* Left: editor */}
              <VStack
                align="stretch"
                spacing={3}
                flex={3}
                minW={0}
              >
                <HStack justify="space-between">
                  <HStack spacing={3}>
                    <Select
                      size="sm"
                      w="180px"
                      value={language}
                      onChange={(e) =>
                        setLanguage(e.target.value as Language)
                      }
                      fontFamily="mono"
                    >
                      <option value="javascript">JavaScript (Node)</option>
                      <option value="typescript">TypeScript (ts-node)</option>
                      <option value="python">Python 3</option>
                      <option value="cpp">C++ (GCC)</option>
                    </Select>

                    <Button
                      size="xs"
                      variant="outline"
                      fontFamily="mono"
                      onClick={() =>
                        setCode(DEFAULT_SNIPPETS[language])
                      }
                    >
                      Reset snippet
                    </Button>
                  </HStack>

                  <HStack spacing={2}>
                    <Button
                      size="xs"
                      variant="ghost"
                      onClick={() => {
                        setResult(null);
                        setError(null);
                        setStdin("");
                      }}
                    >
                      Clear
                    </Button>
                    <Button
                      size="sm"
                      variant="tradingFilled"
                      onClick={handleRun}
                      isDisabled={isRunning}
                      leftIcon={
                        isRunning ? <Spinner size="xs" /> : undefined
                      }
                      fontFamily="mono"
                    >
                      {isRunning ? "Running..." : "Run Code"}
                    </Button>
                  </HStack>
                </HStack>

                <Box
                  flex="1"
                  minH={{ base: "220px", md: "0" }}
                  borderRadius="xl"
                  border="1px solid"
                  borderColor={borderColor}
                  overflow="hidden"
                >
                  <Editor
                    height="100%"
                    defaultLanguage="javascript"
                    language={language === "cpp" ? "cpp" : language}
                    theme="vs-dark"
                    value={code}
                    onChange={(val) => setCode(val ?? "")}
                    options={{
                      fontSize: 13,
                      minimap: { enabled: false },
                      scrollBeyondLastLine: false,
                      wordWrap: "on",
                      smoothScrolling: true,
                    }}
                  />
                </Box>
              </VStack>

              {/* Right: stdin + output */}
              <VStack
                align="stretch"
                spacing={3}
                flex={2}
                minW={0}
              >
                <Box>
                  <Text
                    fontSize="xs"
                    fontFamily="mono"
                    color="gray.500"
                    mb={1}
                  >
                    // Standard Input (stdin)
                  </Text>
                  <Textarea
                    rows={4}
                    value={stdin}
                    onChange={(e) => setStdin(e.target.value)}
                    fontFamily="mono"
                    fontSize="xs"
                    bg={stdinBg}
                    borderRadius="xl"
                    border="1px solid"
                    borderColor={borderColor}
                    _focus={{
                      borderColor: "brand.green",
                      boxShadow: "0 0 0 1px #00ff88",
                    }}
                  />
                </Box>

                <Box flex="1" minH="0">
                  <HStack justify="space-between" mb={1}>
                    <Text
                      fontSize="xs"
                      fontFamily="mono"
                      color="gray.500"
                    >
                      // Output
                    </Text>
                    <HStack spacing={3} fontSize="10px" color="gray.500">
                      {result?.timeMs !== undefined && (
                        <Text fontFamily="mono">
                          time:{" "}
                          <Text as="span" color="brand.green">
                            {result.timeMs.toFixed(1)}ms
                          </Text>
                        </Text>
                      )}
                      {result?.memoryMb !== undefined && (
                        <Text fontFamily="mono">
                          mem:{" "}
                          <Text as="span" color="brand.cyan">
                            {result.memoryMb.toFixed(1)}MB
                          </Text>
                        </Text>
                      )}
                    </HStack>
                  </HStack>

                  <Box
                    borderRadius="xl"
                    border="1px solid"
                    borderColor={borderColor}
                    bg={outputBg}
                    color="gray.100"
                    fontFamily="mono"
                    fontSize="11px"
                    p={3}
                    h="calc(100% - 20px)"
                    overflowY="auto"
                  >
                    {error && (
                      <Text color="brand.red" whiteSpace="pre-wrap">
                        {error}
                      </Text>
                    )}

                    {result?.stderr && (
                      <Text color="brand.red" whiteSpace="pre-wrap">
                        {result.stderr}
                      </Text>
                    )}

                    {result?.stdout && (
                      <Text whiteSpace="pre-wrap">
                        {result.stdout}
                      </Text>
                    )}

                    {!error && !result && !isRunning && (
                      <Text color="gray.600">
                        Run your code to see the output here.
                      </Text>
                    )}

                    {isRunning && !result && (
                      <HStack spacing={2}>
                        <Spinner size="xs" />
                        <Text color="gray.400">
                          Executing inside sandbox...
                        </Text>
                      </HStack>
                    )}
                  </Box>
                </Box>
              </VStack>
            </Flex>

            {/* Footer hint */}
            <HStack
              justify="space-between"
              fontSize="10px"
              color="gray.500"
              fontFamily="mono"
              pt={1}
            >
              <Text>
                Note: This is a demo sandbox. Execution is time &amp; memory
                limited.
              </Text>
              <Text>Press ESC to exit sandbox.</Text>
            </HStack>
          </Flex>
        </MotionBox>
      )}
    </AnimatePresence>
  );
};