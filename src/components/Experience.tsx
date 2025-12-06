import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  useColorModeValue,
  Badge,
  Flex,
  Grid,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { LiveChart } from './LiveChart'

const MotionBox = motion(Box)

export const Experience = () => {
  const cardBg = useColorModeValue('rgba(255, 255, 255, 0.8)', 'rgba(18, 18, 26, 0.7)')
  const borderColor = useColorModeValue('rgba(0, 100, 80, 0.1)', 'rgba(0, 255, 136, 0.1)')

  const achievements = [
    {
      text: 'Led development of comprehensive Risk Management System (RMS) with low-latency UI',
      metric: '-50%',
      metricLabel: 'Order Execution Time',
      icon: '⚡',
    },
    {
      text: 'Designed modular admin panel for user and server management with TCP configuration',
      metric: '+30%',
      metricLabel: 'Operational Efficiency',
      icon: '🎛️',
    },
    {
      text: 'Enabled 100+ users to execute buy/sell and hedge orders with consistent response',
      metric: '<1s',
      metricLabel: 'Response Time',
      icon: '📈',
    },
    {
      text: 'Automated NSE daily reference file parsing and integration',
      metric: '-90%',
      metricLabel: 'Manual Operations',
      icon: '🤖',
    },
    {
      text: 'Built scalable system with Electron, React, Node.js, and PostgreSQL',
      metric: '99.9%',
      metricLabel: 'System Uptime',
      icon: '🚀',
    },
    {
      text: 'Explored AI integration for margin prediction through internal POC',
      metric: 'AI',
      metricLabel: 'Innovation',
      icon: '🧠',
    },
  ]

  const techStack = [
    'ReactJS',
    'NodeJS',
    'ElectronJS',
    'TypeScript',
    'PostgreSQL',
    'Sequelize',
    'REST',
    'WebSocket',
  ]

  return (
    <Box id="experience" py={20} position="relative">
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
              // Experience
            </Text>
            <Heading
              fontSize={{ base: '3xl', md: '5xl' }}
              fontWeight="800"
              textAlign="center"
            >
              Where I{' '}
              <Text as="span" color="brand.cyan">
                Trade
              </Text>{' '}
              Code for{' '}
              <Text as="span" color="brand.green">
                Impact
              </Text>
            </Heading>
          </VStack>
        </MotionBox>

        {/* Main Experience Card */}
        <MotionBox
          bg={cardBg}
          backdropFilter="blur(20px)"
          borderRadius="2xl"
          border="1px solid"
          borderColor={borderColor}
          overflow="hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {/* Header */}
          <Box
            bg="rgba(0, 255, 136, 0.03)"
            borderBottom="1px solid"
            borderColor={borderColor}
            p={6}
          >
            <Flex
              direction={{ base: 'column', md: 'row' }}
              justify="space-between"
              align={{ base: 'start', md: 'center' }}
              gap={4}
            >
              <HStack spacing={4}>
                <Box
                  w="60px"
                  h="60px"
                  borderRadius="xl"
                  bg="rgba(0, 255, 136, 0.1)"
                  border="2px solid"
                  borderColor="brand.green"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  position="relative"
                >
                  <Text fontSize="2xl">💹</Text>
                  <Box
                    position="absolute"
                    bottom="-2px"
                    right="-2px"
                    w="14px"
                    h="14px"
                    borderRadius="full"
                    bg="brand.green"
                    border="2px solid"
                    borderColor={useColorModeValue('white', 'brand.dark')}
                  />
                </Box>
                <VStack align="start" spacing={0}>
                  <Text fontWeight="800" fontSize="xl">
                    Software Developer
                  </Text>
                  <Text fontFamily="mono" color="brand.green" fontSize="md">
                    HFT Firm
                  </Text>
                  <Text fontSize="sm" color="gray.500">
                    Vapi, Gujarat
                  </Text>
                </VStack>
              </HStack>

              <VStack align={{ base: 'start', md: 'end' }} spacing={1}>
                <Badge
                  bg="rgba(0, 255, 136, 0.1)"
                  color="brand.green"
                  px={3}
                  py={1}
                  borderRadius="full"
                  fontFamily="mono"
                  fontSize="xs"
                >
                  <HStack spacing={2}>
                    <Box w="6px" h="6px" borderRadius="full" bg="brand.green" className="pulse" />
                    <Text>Currently Active</Text>
                  </HStack>
                </Badge>
                <Text fontFamily="mono" fontSize="sm" color="gray.500">
                  Jan 2024 - Present
                </Text>
              </VStack>
            </Flex>

            {/* Live performance chart */}
            <Box mt={4}>
              <Flex justify="space-between" align="center" mb={2}>
                <Text fontFamily="mono" fontSize="xs" color="gray.500">
                  Performance Index
                </Text>
                <HStack>
                  <Text fontFamily="mono" fontSize="xs" color="brand.green">
                    ▲ Bullish
                  </Text>
                </HStack>
              </Flex>
              <LiveChart width={700} height={60} strokeColor="#00ff88" volatility={1.5} />
            </Box>
          </Box>

          {/* Achievements Grid */}
          <Box p={6}>
            <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }} gap={4}>
              {achievements.map((achievement, index) => (
                <MotionBox
                  key={index}
                  bg={useColorModeValue('gray.50', 'rgba(0, 0, 0, 0.2)')}
                  borderRadius="xl"
                  p={5}
                  border="1px solid"
                  borderColor="transparent"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 + index * 0.05 }}
                  _hover={{
                    borderColor: 'brand.green',
                    bg: useColorModeValue('white', 'rgba(0, 255, 136, 0.02)'),
                  }}
                >
                  <VStack align="start" spacing={3}>
                    <HStack justify="space-between" w="full">
                      <Text fontSize="2xl">{achievement.icon}</Text>
                      <Badge
                        bg="rgba(0, 255, 136, 0.1)"
                        color="brand.green"
                        fontFamily="mono"
                        fontSize="lg"
                        fontWeight="700"
                        px={3}
                        py={1}
                        borderRadius="lg"
                      >
                        {achievement.metric}
                      </Badge>
                    </HStack>
                    <Text fontSize="sm" color={useColorModeValue('gray.700', 'gray.300')}>
                      {achievement.text}
                    </Text>
                    <Text fontFamily="mono" fontSize="xs" color="brand.cyan">
                      {achievement.metricLabel}
                    </Text>
                  </VStack>
                </MotionBox>
              ))}
            </Grid>

            {/* Tech Stack */}
            <Box mt={8} pt={6} borderTop="1px solid" borderColor={borderColor}>
              <Text fontFamily="mono" fontSize="sm" color="gray.500" mb={4}>
                {'>'} Tech Stack
              </Text>
              <Flex flexWrap="wrap" gap={2}>
                {techStack.map((tech) => (
                  <Badge
                    key={tech}
                    bg="rgba(0, 212, 255, 0.1)"
                    color="brand.cyan"
                    px={4}
                    py={2}
                    borderRadius="full"
                    fontFamily="mono"
                    fontSize="sm"
                    border="1px solid"
                    borderColor="rgba(0, 212, 255, 0.2)"
                    _hover={{
                      borderColor: 'brand.cyan',
                      transform: 'translateY(-2px)',
                    }}
                    transition="all 0.2s ease"
                    cursor="default"
                  >
                    {tech}
                  </Badge>
                ))}
              </Flex>
            </Box>

            {/* Responsibilities */}
            <Box mt={6} pt={6} borderTop="1px solid" borderColor={borderColor}>
              <Text fontFamily="mono" fontSize="sm" color="gray.500" mb={4}>
                {'>'} Full Development Lifecycle
              </Text>
              <Flex flexWrap="wrap" gap={3}>
                {[
                  'Requirement Gathering',
                  'System Design',
                  'Development',
                  'Unit Testing',
                  'Code Reviews',
                  'Deployment',
                  'Support',
                ].map((item) => (
                  <HStack
                    key={item}
                    bg={useColorModeValue('gray.100', 'rgba(255, 255, 255, 0.03)')}
                    px={3}
                    py={2}
                    borderRadius="lg"
                    fontSize="sm"
                  >
                    <Box w="6px" h="6px" borderRadius="full" bg="brand.green" />
                    <Text>{item}</Text>
                  </HStack>
                ))}
              </Flex>
            </Box>
          </Box>
        </MotionBox>
      </Container>
    </Box>
  )
}
