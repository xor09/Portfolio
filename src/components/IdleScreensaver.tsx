import { useEffect, useRef, useState } from 'react'
import { Box, Text, VStack, HStack, useColorModeValue } from '@chakra-ui/react'
import { motion, AnimatePresence } from 'framer-motion'

const MotionBox = motion(Box)

const INACTIVITY_MS = 30_000 // 30 sec

export const IdleScreensaver = () => {
  const [isIdle, setIsIdle] = useState(false)
  const timerRef = useRef<number | null>(null)

  const glowColor = useColorModeValue('#00c27a', '#00ff88')

  // Reset inactivity timer
  const resetTimer = () => {
    if (timerRef.current) {
      window.clearTimeout(timerRef.current)
    }
    setIsIdle(false)
    timerRef.current = window.setTimeout(() => {
      setIsIdle(true)
    }, INACTIVITY_MS)
  }

  useEffect(() => {
    // Don’t run on server
    if (typeof window === 'undefined') return

    const events: (keyof WindowEventMap)[] = [
      'mousemove',
      'mousedown',
      'keydown',
      'wheel',
      'touchstart',
      'scroll',
    ]

    const handleActivity = () => resetTimer()

    events.forEach((evt) => window.addEventListener(evt, handleActivity))
    resetTimer()

    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current)
      events.forEach((evt) => window.removeEventListener(evt, handleActivity))
    }
  }, [])

  const exitScreensaver = () => {
    resetTimer()
  }

  return (
    <AnimatePresence>
      {isIdle && (
        <MotionBox
          position="fixed"
          inset={0}
          zIndex={9998}
          bg="radial-gradient(circle at top, #021b26 0, #020308 45%, #000000 100%)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={exitScreensaver}
          cursor="pointer"
        >
          {/* subtle grid */}
          <Box
            position="absolute"
            inset={0}
            opacity={0.1}
            backgroundImage="
              linear-gradient(rgba(0,255,136,0.12) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,255,136,0.12) 1px, transparent 1px)
            "
            backgroundSize="40px 40px"
          />

          {/* moving candlestick / line charts */}
          {[...Array(4)].map((_, i) => (
            <MotionBox
              key={i}
              position="absolute"
              left={i % 2 === 0 ? '-20%' : '120%'}
              top={`${10 + i * 18}%`}
              width="140%"
              height="80px"
              overflow="hidden"
              opacity={0.45}
              animate={{
                x: i % 2 === 0 ? ['0%', '40%'] : ['0%', '-40%'],
              }}
              transition={{
                duration: 18 + i * 4,
                repeat: Infinity,
                ease: 'linear',
              }}
            >
              <Box
                w="200%"
                h="full"
                bgGradient={`linear(to-r, ${glowColor}33, transparent, ${glowColor}33)`}
                filter="blur(2px)"
              />
            </MotionBox>
          ))}

          {/* falling tickers */}
          {[...Array(22)].map((_, i) => (
            <MotionBox
              key={`ticker-${i}`}
              position="absolute"
              left={`${Math.random() * 100}%`}
              initial={{ y: '-10%' }}
              animate={{ y: '110%' }}
              transition={{
                duration: 10 + Math.random() * 8,
                delay: Math.random() * 5,
                repeat: Infinity,
                ease: 'linear',
              }}
              fontFamily="mono"
              fontSize="xs"
              color="green.300"
              opacity={0.7}
            >
              {['BTC/INR', 'NIFTY', 'BANKNIFTY', 'HFT', 'SPY', 'NASDAQ'][
                Math.floor(Math.random() * 6)
              ]}{' '}
              {Math.random() > 0.5 ? '▲' : '▼'} {(Math.random() * 3).toFixed(2)}%
            </MotionBox>
          ))}

          {/* center content */}
          <VStack
            position="absolute"
            inset={0}
            justify="center"
            align="center"
            spacing={4}
            pointerEvents="none"
          >
            <MotionBox
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <Text
                fontFamily="mono"
                fontSize={{ base: 'md', md: 'lg' }}
                color="gray.400"
                textAlign="center"
                mb={2}
              >
                Portfolio Terminal · Idle Mode
              </Text>
              <Text
                fontSize={{ base: '3xl', md: '5xl' }}
                fontWeight="extrabold"
                bgClip="text"
                bgGradient="linear(to-r, brand.green, brand.cyan)"
                textAlign="center"
                letterSpacing="wide"
              >
                LOW-LATENCY SCREENSAVER
              </Text>
            </MotionBox>

            <MotionBox
              pointerEvents="auto"
              mt={4}
              px={4}
              py={2}
              borderRadius="full"
              border="1px solid"
              borderColor="brand.green"
              bg="blackAlpha.700"
              boxShadow="0 0 25px rgba(0,255,136,0.35)"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <HStack spacing={2}>
                <Text
                  fontFamily="mono"
                  fontSize="xs"
                  color="brand.green"
                >
                  Tap / move / type to wake terminal
                </Text>
              </HStack>
            </MotionBox>
          </VStack>
        </MotionBox>
      )}
    </AnimatePresence>
  )
}
