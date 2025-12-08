import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  useColorModeValue,
  Button,
  Input,
  Textarea,
  Grid,
  Flex,
  useToast,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { FiMail, FiPhone, FiMapPin, FiGithub, FiLinkedin, FiExternalLink } from 'react-icons/fi'
import { LiveChart } from './LiveChart'
import { FormEvent, useState, useEffect, useRef, useCallback } from 'react'

const MotionBox = motion(Box)

export const Contact = () => {
  const cardBg = useColorModeValue('rgba(255, 255, 255, 0.8)', 'rgba(18, 18, 26, 0.7)')
  const borderColor = useColorModeValue('rgba(0, 100, 80, 0.1)', 'rgba(0, 255, 136, 0.1)')
  const inputBg = useColorModeValue('gray.50', 'rgba(0, 0, 0, 0.2)')
  const toast = useToast()

  const [loading, setLoading] = useState(false)
  const [turnstileReady, setTurnstileReady] = useState(false)
  const widgetIdRef = useRef<string | null>(null)
  const tokenResolveRef = useRef<((token: string) => void) | null>(null)
  const tokenRejectRef = useRef<((error: Error) => void) | null>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const formRef = useRef<HTMLFormElement>(null)

  const contactInfo = [
    {
      icon: FiMail,
      label: 'Email',
      value: 'suvechhabishal@gmail.com',
      href: 'mailto:suvechhabishal@gmail.com',
    },
    {
      icon: FiPhone,
      label: 'Phone',
      value: '+91-9016236434',
      href: 'tel:+919016236434',
    },
    {
      icon: FiMapPin,
      label: 'Location',
      value: 'Vapi, Gujarat, India',
      href: '#',
    },
  ]

  const socialLinks = [
    { icon: FiGithub, label: 'GitHub', href: 'https://github.com/xor09' },
    { icon: FiLinkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/suvechha-bishal/' },
    { icon: FiExternalLink, label: 'LeetCode', href: 'https://leetcode.com/u/xor09/' },
    { icon: FiExternalLink, label: 'HackerEarth', href: 'https://www.hackerearth.com/@xor09/' },
  ]

  // Clear pending promise handlers
  const clearPendingHandlers = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
    tokenResolveRef.current = null
    tokenRejectRef.current = null
  }, [])

  // Callback handlers for Turnstile
  const handleTurnstileSuccess = useCallback((token: string) => {
    console.log('✅ Turnstile success')
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
    if (tokenResolveRef.current) {
      tokenResolveRef.current(token)
      clearPendingHandlers()
    }
  }, [clearPendingHandlers])

  const handleTurnstileError = useCallback((error?: unknown) => {
    console.error('❌ Turnstile error:', error)
    if (tokenRejectRef.current) {
      tokenRejectRef.current(new Error('Turnstile verification failed'))
      clearPendingHandlers()
    }
  }, [clearPendingHandlers])

  const handleTurnstileExpired = useCallback(() => {
    console.warn('⚠️ Turnstile token expired')
    if (tokenRejectRef.current) {
      tokenRejectRef.current(new Error('Turnstile token expired'))
      clearPendingHandlers()
    }
  }, [clearPendingHandlers])

  const handleTurnstileTimeout = useCallback(() => {
    console.warn('⏱️ Turnstile timeout')
    if (tokenRejectRef.current) {
      tokenRejectRef.current(new Error('Turnstile verification timed out'))
      clearPendingHandlers()
    }
  }, [clearPendingHandlers])

  // Initialize Turnstile widget
  useEffect(() => {
    const siteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY

    if (!siteKey) {
      console.error('❌ VITE_TURNSTILE_SITE_KEY is not set!')
      return
    }

    const initWidget = () => {
      if (!window.turnstile) {
        return false
      }

      const container = document.getElementById('turnstile-container')
      if (!container) {
        return false
      }

      // Remove existing widget if any
      if (widgetIdRef.current) {
        try {
          window.turnstile.remove(widgetIdRef.current)
        } catch (e) {
          // Ignore
        }
        widgetIdRef.current = null
      }

      try {
        widgetIdRef.current = window.turnstile.render(container, {
          sitekey: siteKey,
          theme: 'dark',
          size: 'invisible',
          execution: 'execute',
          callback: handleTurnstileSuccess,
          'error-callback': handleTurnstileError,
          'expired-callback': handleTurnstileExpired,
          'timeout-callback': handleTurnstileTimeout,
        })
        console.log('✅ Turnstile ready')
        setTurnstileReady(true)
        return true
      } catch (err) {
        console.error('❌ Failed to render Turnstile:', err)
        return false
      }
    }

    // Try immediately
    if (initWidget()) return

    // Poll for Turnstile to be ready
    const interval = setInterval(() => {
      if (initWidget()) {
        clearInterval(interval)
      }
    }, 500)

    // Stop polling after 10 seconds
    const maxWait = setTimeout(() => {
      clearInterval(interval)
    }, 10000)

    // Cleanup
    return () => {
      clearInterval(interval)
      clearTimeout(maxWait)
      if (widgetIdRef.current && window.turnstile) {
        try {
          window.turnstile.remove(widgetIdRef.current)
        } catch (e) {
          // Ignore
        }
      }
    }
  }, [handleTurnstileSuccess, handleTurnstileError, handleTurnstileExpired, handleTurnstileTimeout])

  // Get Turnstile token
  const getTurnstileToken = (): Promise<string> => {
    return new Promise((resolve, reject) => {
      if (!window.turnstile) {
        reject(new Error('Turnstile not loaded'))
        return
      }

      if (!widgetIdRef.current) {
        reject(new Error('Turnstile widget not initialized'))
        return
      }

      clearPendingHandlers()

      tokenResolveRef.current = resolve
      tokenRejectRef.current = reject

      timeoutRef.current = setTimeout(() => {
        if (tokenRejectRef.current) {
          tokenRejectRef.current(new Error('Verification timed out. Please try again.'))
          clearPendingHandlers()
        }
      }, 30000)

      try {
        window.turnstile.reset(widgetIdRef.current)
        window.turnstile.execute(widgetIdRef.current)
      } catch (err) {
        clearPendingHandlers()
        reject(err)
      }
    })
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    // IMPORTANT: Capture form data BEFORE any async operations
    // e.currentTarget becomes null after await
    const form = formRef.current
    if (!form) {
      console.error('Form ref not found')
      return
    }

    const formData = new FormData(form)
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const subject = formData.get('subject') as string
    const message = formData.get('message') as string
    const botField = formData.get('botField') as string

    setLoading(true)

    if (!turnstileReady) {
      toast({
        status: 'warning',
        title: 'Please wait',
        description: 'Security verification is loading...',
        duration: 3000,
        isClosable: true,
      })
      setLoading(false)
      return
    }

    let turnstileToken: string

    try {
      turnstileToken = await getTurnstileToken()
    } catch (err) {
      console.error('❌ Turnstile error:', err)
      toast({
        status: 'error',
        title: 'Verification failed',
        description: err instanceof Error ? err.message : 'Please try again.',
        duration: 4000,
        isClosable: true,
      })
      setLoading(false)
      return
    }

    const payload = {
      name,
      email,
      subject,
      message,
      botField,
      turnstileToken,
    }

    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}))
        throw new Error(errorData.message || 'Failed to send')
      }

      toast({
        status: 'success',
        title: 'Message sent!',
        description: 'I will get back to you soon.',
        duration: 4000,
        isClosable: true,
      })

      form.reset()
    } catch (err) {
      console.error('❌ Send error:', err)
      toast({
        status: 'error',
        title: 'Failed to send message',
        description: err instanceof Error ? err.message : 'Please try again in a bit.',
        duration: 4000,
        isClosable: true,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box id="contact" py={20} position="relative">
      <Container maxW="container.xl">
        <MotionBox
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <VStack spacing={4} mb={16}>
            <Text
              fontFamily="mono"
              fontSize="sm"
              color="brand.green"
              textTransform="uppercase"
              letterSpacing="wider"
            >
              // Contact
            </Text>
            <Heading
              fontSize={{ base: '3xl', md: '5xl' }}
              fontWeight="800"
              textAlign="center"
            >
              Let's{' '}
              <Text as="span" color="brand.green">
                Connect
              </Text>
            </Heading>
            <Text
              fontSize="lg"
              color="gray.500"
              textAlign="center"
              maxW="600px"
            >
              Open to opportunities and collaborations. Let's build something amazing together!
            </Text>
          </VStack>
        </MotionBox>

        <Grid templateColumns={{ base: '1fr', lg: '1fr 1fr' }} gap={8}>
          {/* Contact Info */}
          <MotionBox
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <VStack spacing={6} align="stretch">
              {/* Info Card */}
              <Box
                bg={cardBg}
                backdropFilter="blur(20px)"
                borderRadius="2xl"
                border="1px solid"
                borderColor={borderColor}
                p={8}
              >
                <Text fontFamily="mono" fontSize="sm" color="brand.green" mb={6}>
                  {'>'} Get in Touch
                </Text>

                <VStack spacing={4} align="stretch">
                  {contactInfo.map((item, index) => (
                    <MotionBox
                      key={item.label}
                      as={item.href !== '#' ? 'a' : 'div'}
                      href={item.href !== '#' ? item.href : undefined}
                      bg={inputBg}
                      borderRadius="xl"
                      p={4}
                      border="1px solid"
                      borderColor="transparent"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                      _hover={{
                        borderColor: 'brand.green',
                        transform: 'translateX(5px)',
                      }}
                      cursor={item.href !== '#' ? 'pointer' : 'default'}
                    >
                      <HStack spacing={4}>
                        <Box
                          w="40px"
                          h="40px"
                          borderRadius="lg"
                          bg="rgba(0, 255, 136, 0.1)"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          color="brand.green"
                        >
                          <item.icon size={18} />
                        </Box>
                        <VStack align="start" spacing={0}>
                          <Text fontSize="xs" color="gray.500">
                            {item.label}
                          </Text>
                          <Text fontWeight="600">{item.value}</Text>
                        </VStack>
                      </HStack>
                    </MotionBox>
                  ))}
                </VStack>
              </Box>

              {/* Social Links */}
              <Box
                bg={cardBg}
                backdropFilter="blur(20px)"
                borderRadius="2xl"
                border="1px solid"
                borderColor={borderColor}
                p={8}
              >
                <Text fontFamily="mono" fontSize="sm" color="brand.cyan" mb={6}>
                  {'>'} Social Profiles
                </Text>

                <Grid templateColumns="repeat(2, 1fr)" gap={3}>
                  {socialLinks.map((link, index) => (
                    <MotionBox
                      key={link.label}
                      as="a"
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      bg={inputBg}
                      borderRadius="xl"
                      p={4}
                      border="1px solid"
                      borderColor="transparent"
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
                      _hover={{
                        borderColor: 'brand.cyan',
                        bg: 'rgba(0, 212, 255, 0.05)',
                      }}
                      data-cursor-hover
                    >
                      <HStack spacing={3}>
                        <link.icon size={18} color="#00d4ff" />
                        <Text fontSize="sm" fontWeight="500">
                          {link.label}
                        </Text>
                      </HStack>
                    </MotionBox>
                  ))}
                </Grid>
              </Box>

              {/* Live Status */}
              <Box
                bg={cardBg}
                backdropFilter="blur(20px)"
                borderRadius="2xl"
                border="1px solid"
                borderColor={borderColor}
                p={6}
              >
                <Flex justify="space-between" align="center" mb={4}>
                  <HStack>
                    <Box w="8px" h="8px" borderRadius="full" bg="brand.green" className="pulse" />
                    <Text fontFamily="mono" fontSize="sm" color="brand.green">
                      Currently Available
                    </Text>
                  </HStack>
                  <Text fontFamily="mono" fontSize="xs" color="gray.500">
                    Response &lt; 24h
                  </Text>
                </Flex>
                <LiveChart width={300} height={50} volatility={1} strokeColor="#00ff88" />
              </Box>
            </VStack>
          </MotionBox>

          {/* Contact Form */}
          <MotionBox
            bg={cardBg}
            backdropFilter="blur(20px)"
            borderRadius="2xl"
            border="1px solid"
            borderColor={borderColor}
            p={8}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Text fontFamily="mono" fontSize="sm" color="brand.green" mb={6}>
              {'>'} Send a Message
            </Text>

            <form ref={formRef} onSubmit={handleSubmit}>
              <VStack spacing={5} align="stretch">
                <Box>
                  <Text fontSize="sm" fontWeight="500" mb={2}>
                    Name
                  </Text>
                  <Input
                    name="name"
                    placeholder="Your name"
                    bg={inputBg}
                    border="1px solid"
                    borderColor={borderColor}
                    borderRadius="xl"
                    py={6}
                    fontFamily="mono"
                    _hover={{ borderColor: 'brand.green' }}
                    _focus={{ borderColor: 'brand.green', boxShadow: '0 0 0 1px #00ff88' }}
                    required
                  />
                </Box>

                <Box>
                  <Text fontSize="sm" fontWeight="500" mb={2}>
                    Email
                  </Text>
                  <Input
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    bg={inputBg}
                    border="1px solid"
                    borderColor={borderColor}
                    borderRadius="xl"
                    py={6}
                    fontFamily="mono"
                    _hover={{ borderColor: 'brand.green' }}
                    _focus={{ borderColor: 'brand.green', boxShadow: '0 0 0 1px #00ff88' }}
                    required
                  />
                </Box>

                <Box>
                  <Text fontSize="sm" fontWeight="500" mb={2}>
                    Subject
                  </Text>
                  <Input
                    name="subject"
                    placeholder="What's this about?"
                    bg={inputBg}
                    border="1px solid"
                    borderColor={borderColor}
                    borderRadius="xl"
                    py={6}
                    fontFamily="mono"
                    _hover={{ borderColor: 'brand.green' }}
                    _focus={{ borderColor: 'brand.green', boxShadow: '0 0 0 1px #00ff88' }}
                    required
                  />
                </Box>

                <Box>
                  <Text fontSize="sm" fontWeight="500" mb={2}>
                    Message
                  </Text>
                  <Textarea
                    name="message"
                    placeholder="Tell me about your project..."
                    bg={inputBg}
                    border="1px solid"
                    borderColor={borderColor}
                    borderRadius="xl"
                    rows={5}
                    fontFamily="mono"
                    _hover={{ borderColor: 'brand.green' }}
                    _focus={{ borderColor: 'brand.green', boxShadow: '0 0 0 1px #00ff88' }}
                    resize="none"
                    required
                  />
                </Box>

                {/* Honeypot field */}
                <input
                  name="botField"
                  type="text"
                  style={{ display: 'none' }}
                  autoComplete="off"
                  tabIndex={-1}
                />

                {/* Turnstile container */}
                <div id="turnstile-container" />

                <Button
                  type="submit"
                  variant="tradingFilled"
                  size="lg"
                  fontFamily="mono"
                  leftIcon={<FiMail />}
                  mt={2}
                  data-cursor-hover
                  isLoading={loading}
                  loadingText="Sending..."
                  isDisabled={!turnstileReady}
                >
                  {turnstileReady ? 'SEND MESSAGE' : 'Loading...'}
                </Button>
              </VStack>
            </form>

            {/* Terminal decoration */}
            <Box mt={8} pt={6} borderTop="1px solid" borderColor={borderColor}>
              <Text fontFamily="mono" fontSize="xs" color="gray.500">
                <Text as="span" color="brand.green">
                  const
                </Text>{' '}
                <Text as="span" color="brand.cyan">
                  response
                </Text>{' '}
                ={' '}
                <Text as="span" color="brand.gold">
                  await
                </Text>{' '}
                sendMessage(yourIdea);
              </Text>
              <Text fontFamily="mono" fontSize="xs" color="gray.500" mt={1}>
                <Text as="span" color="brand.green">
                  console
                </Text>
                .log(
                <Text as="span" color="brand.gold">
                  "Looking forward to hearing from you!"
                </Text>
                );
              </Text>
            </Box>
          </MotionBox>
        </Grid>
      </Container>
    </Box>
  )
}