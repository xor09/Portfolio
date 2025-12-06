import {
  VStack,
  Text,
  HStack,
  Modal,
  ModalOverlay,
  ModalContent,
  useColorModeValue,
} from "@chakra-ui/react";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { dockElements } from "../constants";

const MotionContent = motion(ModalContent);

export const MetricsPopup = () => {
  const bg = useColorModeValue(
    "rgba(255,255,255,0.95)",
    "rgba(18,18,26,0.95)"
  );

  const borderColor = useColorModeValue(
    "rgba(0,100,80,0.2)",
    "rgba(0,255,136,0.2)"
  );

  const [showMetrics, setShowMetrics] = useState(false);

  const [metrics, setMetrics] = useState({
    cpu: 12,
    memory: 48,
    latency: 3,
    fps: 59,
    wsLoad: 322,
    network: "—",
  });

  // -----------------------------
  // METRICS HELPERS
  // -----------------------------

  const getFPS = (callback: (fps: number) => void) => {
    let last = performance.now();
    let frames = 0;

    function loop() {
      const now = performance.now();
      frames++;

      if (now > last + 1000) {
        callback(frames);
        frames = 0;
        last = now;
      }

      requestAnimationFrame(loop);
    }

    loop();
  };

  const getMemory = () => {
    if ((performance as any).memory) {
      const mem = (performance as any).memory;
      const used = (mem.usedJSHeapSize / mem.jsHeapSizeLimit) * 100;
      return used.toFixed(1);
    }
    return null;
  };

  const getLatency = () => {
    return new Promise((resolve) => {
      const img = new Image();
      const start = performance.now();

      img.onload = () => resolve(+(performance.now() - start).toFixed(1));
      img.onerror = () => resolve(+(performance.now() - start).toFixed(1));

      img.src = "https://www.cloudflare.com/favicon.ico?" + Math.random();
    });
  };

  const getNetworkSpeed = () => {
    const conn = (navigator as any).connection;
    return conn?.downlink ? conn.downlink + " Mbps" : null;
  };

  // -----------------------------
  // EFFECT: Metric Updates + Handlers
  // -----------------------------

  useEffect(() => {
    // FPS
    getFPS((fps) => setMetrics((m) => ({ ...m, fps })));

    // Periodic update for system metrics
    const id = setInterval(async () => {
      const memory = getMemory();
      const latency = await getLatency();
      const net = getNetworkSpeed();

      setMetrics((m: any) => ({
        ...m,
        memory: memory ?? m.memory,
        latency,
        network: net ?? m.network,
        wsLoad: Math.floor(200 + Math.random() * 500),
      }));
    }, 3000);

    // Open/close through global events
    const openHandler = () => setShowMetrics(true);
    const closeHandler = () => setShowMetrics(false);

    window.addEventListener("open-metrics-popup", openHandler);
    window.addEventListener("close-metrics-popup", closeHandler);

    return () => {
      clearInterval(id);
      window.removeEventListener("open-metrics-popup", openHandler);
      window.removeEventListener("close-metrics-popup", closeHandler);
    };
  }, [showMetrics]);

  // -----------------------------
  //     FINAL RENDER
  // -----------------------------

  return (
    <Modal
      isOpen={showMetrics}
      onClose={() => setShowMetrics(false)}
      closeOnEsc
      isCentered
      onOverlayClick={() => setShowMetrics(false)}
      onCloseComplete={() => { 
            window.dispatchEvent(new CustomEvent("bottom-dock-event", {
               detail : {
                 close : dockElements.METRICS
               }
            }))
        }
      }
    >
      <AnimatePresence>
        {showMetrics && (
          <>
            {/* BACKDROP */}
            <ModalOverlay bg="rgba(0,0,0,0.7)" backdropFilter="blur(10px)" />

            {/* POPUP BOX */}
            <MotionContent
              bg={bg}
              border="1px solid"
              borderColor={borderColor}
              borderRadius="2xl"
              overflow="hidden"
              maxW="500px"
              mx={4}
              p={6}
              boxShadow="0 25px 50px -12px rgba(0,0,0,0.5), 0 0 50px rgba(0,255,136,0.1)"
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.18 }}
            >
              <Text
                fontFamily="mono"
                fontSize="sm"
                color="brand.green"
                textAlign="center"
                mb={4}
              >
                LIVE METRICS
              </Text>

              {/* METRICS LIST */}
              <VStack align="stretch" spacing={4}>
                <MetricRow label="CPU" value={metrics.cpu + "%"} />
                <MetricRow label="Memory" value={metrics.memory + "%"} />
                <MetricRow label="Latency" value={metrics.latency + " ms"} />
                <MetricRow label="FPS" value={metrics.fps} />
                <MetricRow label="WS Load" value={metrics.wsLoad} />
                <MetricRow label="Network" value={metrics.network} />
              </VStack>
            </MotionContent>
          </>
        )}
      </AnimatePresence>
    </Modal>
  );
};

// -----------------------------
// A METRIC ROW UI COMPONENT
// -----------------------------

const MetricRow = ({ label, value }: any) => (
  <HStack justify="space-between">
    <Text fontSize="xs" fontFamily="mono" color="gray.500">
      {label}
    </Text>
    <Text fontSize="xs" fontFamily="mono" color="brand.green">
      {value}
    </Text>
  </HStack>
);
