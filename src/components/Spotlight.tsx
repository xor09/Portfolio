import { useState, useEffect, useCallback, useRef } from 'react'
import {
  Box,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  Text,
  VStack,
  HStack,
  useColorModeValue,
  Kbd,
} from '@chakra-ui/react'
import { motion, AnimatePresence } from 'framer-motion'
import { dockElements } from '../constants'

const MotionBox = motion(Box)

interface SpotlightCommand {
  command: string
  description: string
  icon: string
  action: () => void
  isEasterEgg?: boolean
}

export const Spotlight = (props: any) => {
  const { boostEnabled } = props
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [activeEasterEgg, setActiveEasterEgg] = useState<string | null>(null)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const itemRefs = useRef<any>([])


  const bgColor = useColorModeValue('rgba(255, 255, 255, 0.95)', 'rgba(18, 18, 26, 0.95)')
  const borderColor = useColorModeValue('rgba(0, 100, 80, 0.2)', 'rgba(0, 255, 136, 0.2)')

  const dispatchCloseSpotlight = () => { 
      window.dispatchEvent(new CustomEvent("bottom-dock-event", {
         detail : {
           close : dockElements.SPOTLIGHT
         }
      }))
  }

  // Easter egg animations
  const triggerBull = useCallback(() => {
    setActiveEasterEgg('bull')
    setIsOpen(false)
    setQuery('')
    setTimeout(() => setActiveEasterEgg(null), 4000)
    dispatchCloseSpotlight()
  }, [])

  const triggerBear = useCallback(() => {
    setActiveEasterEgg('bear')
    setIsOpen(false)
    setQuery('')
    setTimeout(() => setActiveEasterEgg(null), 4000)
     dispatchCloseSpotlight()
  }, [])

  const triggerRocket = useCallback(() => {
    setActiveEasterEgg('rocket')
    setIsOpen(false)
    setQuery('')
    setTimeout(() => setActiveEasterEgg(null), 3000)
     dispatchCloseSpotlight()
  }, [])

  const triggerMatrix = useCallback(() => {
    setActiveEasterEgg('matrix')
    setIsOpen(false)
    setQuery('')
    setTimeout(() => setActiveEasterEgg(null), 5000)
     dispatchCloseSpotlight()
  }, [])

  const triggerMoney = useCallback(() => {
    setActiveEasterEgg('money')
    setIsOpen(false)
    setQuery('')
    setTimeout(() => setActiveEasterEgg(null), 3000)
     dispatchCloseSpotlight()
  }, [])

  const navigateTo = useCallback((section: string) => {
    setIsOpen(false)
    setQuery('')
    const element = document.getElementById(section)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])

  useEffect(() => {
    const openHandler = () => setIsOpen(true);
    const closeHandler = () => {
      setIsOpen(false);
      setQuery('')
      setSelectedIndex(0)
    };
    window.addEventListener("open-spotlight", openHandler);
    window.addEventListener("close-spotlight", closeHandler)
    return () => {
      window.removeEventListener("open-spotlight", openHandler);
      window.removeEventListener("close-spotlight", closeHandler);
    }
  }, []);


  const commands: SpotlightCommand[] = [
    { command: 'bull', description: 'Run the bulls! 🐂', icon: '🐂', action: triggerBull, isEasterEgg: true },
    { command: 'bear', description: 'Release the bear! 🐻', icon: '🐻', action: triggerBear, isEasterEgg: true },
    { command: 'moon', description: 'To the moon! 🚀', icon: '🚀', action: triggerRocket, isEasterEgg: true },
    { command: 'matrix', description: 'Enter the matrix', icon: '💊', action: triggerMatrix, isEasterEgg: true },
    { command: 'money', description: 'Make it rain! 💸', icon: '💰', action: triggerMoney, isEasterEgg: true },
    { command: 'about', description: 'Go to About section', icon: '👤', action: () => navigateTo('about') },
    { command: 'experience', description: 'Go to Experience', icon: '💼', action: () => navigateTo('experience') },
    { command: 'projects', description: 'View Projects', icon: '🚀', action: () => navigateTo('projects') },
    { command: 'skills', description: 'Check out Skills', icon: '⚡', action: () => navigateTo('skills') },
    { command: 'achievements', description: 'See Achievements', icon: '🏆', action: () => navigateTo('achievements') },
    { command: 'contact', description: 'Get in touch', icon: '📧', action: () => navigateTo('contact') },
    { command: 'hire', description: 'Hire me!', icon: '🤝', action: () => navigateTo('contact') },
  ]

  const filteredCommands = commands.filter(cmd =>
    cmd.command.toLowerCase().includes(query.toLowerCase()) ||
    cmd.description.toLowerCase().includes(query.toLowerCase())
  )

  // Reset selected index when query changes
  useEffect(() => {
    setSelectedIndex(0)
  }, [query])

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen])

  useEffect(() => {
    const el = itemRefs.current[selectedIndex]
    if (el) {
        el.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        })
    }
  }, [selectedIndex])


  // Handle Enter key to execute first command
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && filteredCommands.length > 0) {
      e.preventDefault()
      filteredCommands[selectedIndex].action()
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex(prev => 
        prev < filteredCommands.length - 1 ? prev + 1 : prev
      )
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex(prev => (prev > 0 ? prev - 1 : 0))
    }
  }

  return (
    <>
    <Modal 
    isOpen={isOpen} 
    onClose={() => setIsOpen(false)} 
    isCentered 
    onOverlayClick={() => setIsOpen(false)}
    onCloseComplete={dispatchCloseSpotlight}    
    >
      {/* Spotlight Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            <ModalOverlay
              bg="rgba(0, 0, 0, 0.7)"
              backdropFilter="blur(10px)"
            />
            <ModalContent
              as={motion.div}
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              bg={bgColor}
              backdropFilter="blur(20px)"
              border="1px solid"
              borderColor={borderColor}
              borderRadius="2xl"
              overflow="hidden"
              maxW="600px"
              mx={4}
              boxShadow="0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 50px rgba(0, 255, 136, 0.1)"
            >
              {/* Search Input */}
              <Box p={4} borderBottom="1px solid" borderColor={borderColor}>
                <HStack>
                  <Text fontSize="xl">⌘</Text>
                  <Input
                    ref={inputRef}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type a command... (try 'bull' or 'moon')"
                    variant="unstyled"
                    fontSize="lg"
                    fontFamily="mono"
                    _placeholder={{ color: 'gray.500' }}
                  />
                  <Kbd>esc</Kbd>
                </HStack>
              </Box>

              {/* Commands List */}
              <VStack align="stretch" p={2} maxH="400px" overflowY="auto" spacing={1}>
                {filteredCommands.length > 0 ? (
                  filteredCommands.map((cmd, index) => (
                    <MotionBox
                      key={cmd.command}
                      ref={el => (itemRefs.current[index] = el)}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.03 }}
                      p={3}
                      borderRadius="xl"
                      cursor="pointer"
                      onClick={cmd.action}
                      bg={index === selectedIndex ? 'rgba(0, 255, 136, 0.1)' : 'transparent'}
                      border="1px solid"
                      borderColor={index === selectedIndex ? 'brand.green' : 'transparent'}
                      _hover={{
                        bg: 'rgba(0, 255, 136, 0.1)',
                        borderColor: 'brand.green',
                      }}
                      onMouseEnter={() => setSelectedIndex(index)}
                      style={{ transition: 'background 0.2s ease, border-color 0.2s ease' }}
                    >
                      <HStack justify="space-between">
                        <HStack spacing={3}>
                          <Text fontSize="xl">{cmd.icon}</Text>
                          <VStack align="start" spacing={0}>
                            <HStack>
                              <Text fontFamily="mono" fontWeight="600">
                                {cmd.command}
                              </Text>
                              {cmd.isEasterEgg && (
                                <Text fontSize="xs" color="brand.gold">✨</Text>
                              )}
                            </HStack>
                            <Text fontSize="sm" color="gray.500">
                              {cmd.description}
                            </Text>
                          </VStack>
                        </HStack>
                        {index === selectedIndex && (
                          <Kbd>↵</Kbd>
                        )}
                      </HStack>
                    </MotionBox>
                  ))
                ) : (
                  <Box p={8} textAlign="center">
                    <Text fontSize="4xl" mb={2}>🔍</Text>
                    <Text color="gray.500">No commands found</Text>
                  </Box>
                )}
              </VStack>

              {/* Footer hint */}
              <Box p={3} borderTop="1px solid" borderColor={borderColor} bg="rgba(0, 0, 0, 0.1)">
                <HStack justify="center" spacing={4} fontSize="xs" color="gray.500">
                  <HStack>
                    <Kbd>↑↓</Kbd>
                    <Text>Navigate</Text>
                  </HStack>
                  <HStack>
                    <Kbd>↵</Kbd>
                    <Text>Select</Text>
                  </HStack>
                  <HStack>
                    <Kbd>esc</Kbd>
                    <Text>Close</Text>
                  </HStack>
                </HStack>
              </Box>
            </ModalContent>
          </>
        )}
      </AnimatePresence>
      </Modal>

      {/* Easter Egg Animations */}
      <AnimatePresence>
        {/* Bull Running Animation */}
        {activeEasterEgg === 'bull' && (
          <Box
            position="fixed"
            inset="0"
            pointerEvents="none"
            zIndex="9999"
            overflow="hidden"
          >
            {/* Multiple bulls */}
            {[...Array(5)].map((_, i) => (
              <MotionBox
                key={i}
                position="absolute"
                initial={{ x: '-200px', y: `${20 + i * 15}%` }}
                animate={{ x: 'calc(100vw + 200px)' }}
                transition={{
                  duration: 2,
                  delay: i * 0.3,
                  ease: 'linear',
                }}
                fontSize={`${80 - i * 10}px`}
                style={{ transform: 'scaleX(-1)' }}
              >
                🐂
              </MotionBox>
            ))}
            {/* Dust trail */}
            {[...Array(20)].map((_, i) => (
              <MotionBox
                key={`dust-${i}`}
                position="absolute"
                initial={{
                  x: `${Math.random() * 100}vw`,
                  y: `${Math.random() * 100}vh`,
                  opacity: 0,
                  scale: 0,
                }}
                animate={{
                  opacity: [0, 0.5, 0],
                  scale: [0, 1, 0.5],
                  y: `${Math.random() * 100}vh`,
                }}
                transition={{
                  duration: 1.5,
                  delay: i * 0.1,
                  ease: 'easeOut',
                }}
                fontSize="30px"
              >
                💨
              </MotionBox>
            ))}
            {/* Text banner */}
            <MotionBox
              position="absolute"
              top="50%"
              left="50%"
              transform="translate(-50%, -50%)"
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0 }}
              transition={{ type: 'spring', damping: 10 }}
              bg="rgba(0, 255, 136, 0.9)"
              color="black"
              px={8}
              py={4}
              borderRadius="2xl"
              fontFamily="mono"
              fontWeight="800"
              fontSize="3xl"
              textAlign="center"
              boxShadow="0 0 60px rgba(0, 255, 136, 0.5)"
            >
              BULL RUN! 📈
            </MotionBox>
          </Box>
        )}

        {/* Bear Running Animation */}
        {activeEasterEgg === 'bear' && (
          <Box
            position="fixed"
            inset="0"
            pointerEvents="none"
            zIndex="9999"
            overflow="hidden"
          >
            {/* Screen turns red */}
            <MotionBox
              position="absolute"
              inset="0"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.3, 0.1] }}
              transition={{ duration: 1 }}
              bg="red.500"
            />
            {/* Bears falling */}
            {[...Array(8)].map((_, i) => (
              <MotionBox
                key={i}
                position="absolute"
                initial={{
                  x: `${10 + i * 12}%`,
                  y: '-100px',
                  rotate: 0,
                }}
                animate={{
                  y: 'calc(100vh + 100px)',
                  rotate: 360,
                }}
                transition={{
                  duration: 2.5,
                  delay: i * 0.2,
                  ease: 'easeIn',
                }}
                fontSize="60px"
              >
                🐻
              </MotionBox>
            ))}
            {/* Crash effect */}
            {[...Array(15)].map((_, i) => (
              <MotionBox
                key={`crash-${i}`}
                position="absolute"
                initial={{
                  x: '50%',
                  y: '50%',
                  opacity: 0,
                }}
                animate={{
                  x: `${50 + (Math.random() - 0.5) * 100}%`,
                  y: `${50 + (Math.random() - 0.5) * 100}%`,
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 1,
                  delay: 0.5 + i * 0.05,
                }}
                fontSize="30px"
              >
                📉
              </MotionBox>
            ))}
            {/* Text banner */}
            <MotionBox
              position="absolute"
              top="50%"
              left="50%"
              transform="translate(-50%, -50%)"
              initial={{ scale: 0, rotate: 10 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0 }}
              transition={{ type: 'spring', damping: 10 }}
              bg="rgba(255, 59, 92, 0.9)"
              color="white"
              px={8}
              py={4}
              borderRadius="2xl"
              fontFamily="mono"
              fontWeight="800"
              fontSize="3xl"
              textAlign="center"
              boxShadow="0 0 60px rgba(255, 59, 92, 0.5)"
            >
              BEAR MARKET! 📉
            </MotionBox>
          </Box>
        )}

        {/* Rocket to the Moon */}
        {activeEasterEgg === 'rocket' && (
          <Box
            position="fixed"
            inset="0"
            pointerEvents="none"
            zIndex="9999"
            overflow="hidden"
          >
            {/* Stars background */}
            {[...Array(50)].map((_, i) => (
              <MotionBox
                key={`star-${i}`}
                position="absolute"
                initial={{
                  x: `${Math.random() * 100}%`,
                  y: `${Math.random() * 100}%`,
                  opacity: 0,
                }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 1,
                  delay: Math.random() * 2,
                  repeat: 2,
                }}
                color="white"
                fontSize="16px"
              >
                ✦
              </MotionBox>
            ))}
            {/* Rocket */}
            <MotionBox
              position="absolute"
              initial={{ x: '50%', y: '120vh', rotate: 0 }}
              animate={{ y: '-200px' }}
              transition={{ duration: 2, ease: 'easeOut' }}
              fontSize="100px"
              style={{ transform: 'translateX(-50%)' }}
            >
              🚀
            </MotionBox>
            {/* Moon */}
            <MotionBox
              position="absolute"
              top="50px"
              left="50%"
              transform="translateX(-50%)"
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 1] }}
              transition={{ delay: 1, duration: 0.5 }}
              fontSize="120px"
            >
              🌕
            </MotionBox>
            {/* Text */}
            <MotionBox
              position="absolute"
              top="50%"
              left="50%"
              transform="translate(-50%, -50%)"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.5 }}
              fontFamily="mono"
              fontWeight="800"
              fontSize="4xl"
              color="white"
              textShadow="0 0 30px rgba(255, 215, 0, 0.8)"
            >
              TO THE MOON! 🌙
            </MotionBox>
          </Box>
        )}

        {/* Matrix Rain */}
        {activeEasterEgg === 'matrix' && (
          <Box
            position="fixed"
            inset="0"
            pointerEvents="none"
            zIndex="9999"
            overflow="hidden"
            bg="rgba(0, 0, 0, 0.9)"
          >
            {[...Array(30)].map((_, i) => (
              <MotionBox
                key={i}
                position="absolute"
                left={`${i * 3.33}%`}
                initial={{ y: '-100%' }}
                animate={{ y: '100vh' }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  delay: Math.random() * 2,
                  repeat: 1,
                  ease: 'linear',
                }}
                fontFamily="mono"
                fontSize="20px"
                color="brand.green"
                textShadow="0 0 10px #00ff88"
                lineHeight="1.2"
              >
                {[...Array(20)].map((_, j) => (
                  <Box key={j}>
                    {String.fromCharCode(0x30A0 + Math.random() * 96)}
                  </Box>
                ))}
              </MotionBox>
            ))}
            <MotionBox
              position="absolute"
              top="50%"
              left="50%"
              transform="translate(-50%, -50%)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              fontFamily="mono"
              fontWeight="800"
              fontSize="3xl"
              color="brand.green"
              textShadow="0 0 20px #00ff88"
              textAlign="center"
            >
              WAKE UP, NEO...
              <Text fontSize="lg" mt={2}>
                The Matrix has you.
              </Text>
            </MotionBox>
          </Box>
        )}

        {/* Money Rain */}
        {activeEasterEgg === 'money' && (
          <Box
            position="fixed"
            inset="0"
            pointerEvents="none"
            zIndex="9999"
            overflow="hidden"
          >
            {[...Array(40)].map((_, i) => (
              <MotionBox
                key={i}
                position="absolute"
                initial={{
                  x: `${Math.random() * 100}%`,
                  y: '-50px',
                  rotate: 0,
                }}
                animate={{
                  y: 'calc(100vh + 50px)',
                  rotate: Math.random() * 360,
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  delay: Math.random() * 1,
                  ease: 'linear',
                }}
                fontSize={`${30 + Math.random() * 30}px`}
              >
                {['💵', '💰', '💸', '🤑', '💎'][Math.floor(Math.random() * 5)]}
              </MotionBox>
            ))}
            <MotionBox
              position="absolute"
              top="50%"
              left="50%"
              transform="translate(-50%, -50%)"
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', damping: 10 }}
              bg="rgba(255, 215, 0, 0.9)"
              color="black"
              px={8}
              py={4}
              borderRadius="2xl"
              fontFamily="mono"
              fontWeight="800"
              fontSize="3xl"
              textAlign="center"
              boxShadow="0 0 60px rgba(255, 215, 0, 0.5)"
            >
              MAKING IT RAIN! 💰
            </MotionBox>
          </Box>
        )}
      </AnimatePresence>

      {/* Keyboard hint (shown in corner) */}
      {
        boostEnabled ?
          <MotionBox
            position="fixed"
            bottom={4}
            right={4}
            zIndex={50}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
          >
            <HStack
              bg={useColorModeValue('rgba(255,255,255,0.8)', 'rgba(18, 18, 26, 0.8)')}
              backdropFilter="blur(10px)"
              px={3}
              py={2}
              borderRadius="lg"
              border="1px solid"
              borderColor={borderColor}
              fontSize="xs"
              color="gray.500"
              spacing={2}
              _hover={{ borderColor: 'brand.green' }}
              cursor="pointer"
              onClick={() => setIsOpen(true)}
            >
              <Kbd>⌘</Kbd>
              <Text>+</Text>
              <Kbd>K</Kbd>
            </HStack>
          </MotionBox> : null
      }
    </>
  )
}