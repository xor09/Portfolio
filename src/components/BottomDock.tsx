import { Box, HStack, IconButton, useColorModeValue } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { RiBarChartFill, RiCodepenFill, RiHome5Fill, RiSearchEyeFill, RiTerminalBoxFill } from "react-icons/ri";
import { dockElements } from "../constants";

const MotionBox = motion(Box);

export const BottomDock = () => {
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState<string>(dockElements.HOME);

  const bg = useColorModeValue("rgba(255,255,255,0.75)", "rgba(0,0,0,0.45)");

  // CLICK HANDLERS
  const setAndDispatch = (screen: typeof active) => {
    setActive(screen);
    window.dispatchEvent(new CustomEvent("dock-update", { detail: { active: screen } }));
  };

  const onHomeClick = () => {
    setAndDispatch(dockElements.HOME);
    window.dispatchEvent(new Event("close-spotlight"));
    window.dispatchEvent(new Event("close-metrics-popup"));
    window.dispatchEvent(new Event("close-terminal"));
    window.dispatchEvent(new Event("close-sandbox"));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onSpotlightClick = () => {
    setAndDispatch(dockElements.SPOTLIGHT);
    window.dispatchEvent(new Event("open-spotlight"));
    window.dispatchEvent(new Event("close-metrics-popup"));
    window.dispatchEvent(new Event("close-terminal"));
     window.dispatchEvent(new Event("close-sandbox"));
  };

  const onMetricsClick = () => {
    setAndDispatch(dockElements.METRICS);
    window.dispatchEvent(new Event("open-metrics-popup"));
    window.dispatchEvent(new Event("close-spotlight"));
    window.dispatchEvent(new Event("close-terminal"));
     window.dispatchEvent(new Event("close-sandbox"));
  };

  const onTerminalClick = () => {
    setAndDispatch(dockElements.TERMINAL);
    window.dispatchEvent(new Event("open-terminal"));
    window.dispatchEvent(new Event("close-spotlight"));
    window.dispatchEvent(new Event("close-metrics-popup"));
     window.dispatchEvent(new Event("close-sandbox"));
  };

  const onCodeEditorClick = () => {
    setAndDispatch(dockElements.SANDBOX);
    window.dispatchEvent(new Event("open-sandbox"));
    window.dispatchEvent(new Event("close-spotlight"));
    window.dispatchEvent(new Event("close-metrics-popup"));
    window.dispatchEvent(new Event("close-terminal"));
  }

  // LISTEN FOR POPUP CLOSES (ESC or overlay)
  useEffect(() => {
    const handleDockEvent = (e: any) => {
      if (!e.detail?.active) return;
      setActive(e.detail.active);
    };

    const handleMouseMove = (e: MouseEvent) => {
      setVisible(window.innerHeight - e.clientY < 80);
    };

    // const handleDockCloseEvent = (e: any) => {
    //     console.log("BOTTOM DOCK EVENT", e.detail);
    //   if (!e.detail?.close) return;
    //   if (active === e.detail.close) {
    //     setActive(dockElements.HOME);
    //   }
    // }

    const handleShortcutCtrlK = (e: any) => {
      setAndDispatch(e.detail.active);
      onSpotlightClick();
    }

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("dock-update", handleDockEvent);
    window.addEventListener("shortcut-ctrl+k", handleShortcutCtrlK);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("dock-update", handleDockEvent);
      window.removeEventListener("shortcut-ctrl+k", handleShortcutCtrlK);
    };
  }, []);

  // ACTIVE ICON COMPONENT
  const DockIcon = ({
    id,
    icon,
    onClick,
  }: {
    id: typeof active;
    icon: any;
    onClick: () => void;
  }) => {
    const isActive = active === id;

    return (
      <MotionBox animate={isActive ? { scale: 1.5 } : { scale: 1 }}>
        <IconButton
          aria-label={id}
          icon={icon}
          size="lg"
          variant="ghost"
          color={isActive ? "brand.green" : "brand.red"}
          onClick={onClick}
        />
        {isActive && (
          <Box
            position="absolute"
            bottom="-5px"
            left="50%"
            transform="translateX(-50%)"
            width="10px"
            height="4px"
            borderRadius="full"
            bg="brand.green"
            boxShadow="0 0 10px rgba(0,255,136,1)"
          />
        )}
      </MotionBox>
    );
  };

  return (
    <AnimatePresence>
      {visible && (
        <MotionBox
          position="fixed"
          bottom="20px"
          left="40%"
          transform="translateX(-50%)"
          px={6}
          py={3}
          bg={bg}
          borderRadius="2xl"
          backdropFilter="blur(20px)"
          border="1px solid rgba(0,255,136,0.2)"
          boxShadow="0 10px 35px rgba(0,255,136,0.3)"
          zIndex={5000}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
        >
          <HStack spacing={7}>
            <DockIcon id="home" icon={<RiHome5Fill size={22} />} onClick={onHomeClick} />
            <DockIcon id="spotlight" icon={<RiSearchEyeFill size={22} />} onClick={onSpotlightClick} />
            <DockIcon id="metrics" icon={<RiBarChartFill size={22} />} onClick={onMetricsClick} />
            <DockIcon id="terminal" icon={<RiTerminalBoxFill size={22} />} onClick={onTerminalClick} />
            <DockIcon id="sandbox" icon={<RiCodepenFill size={22} />} onClick={onCodeEditorClick} />
          </HStack>
        </MotionBox>
      )}
    </AnimatePresence>
  );
};
