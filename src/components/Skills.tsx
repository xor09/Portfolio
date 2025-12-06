import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  useColorModeValue,
  Grid,
  Flex,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'

const MotionBox = motion(Box)

export const Skills = () => {
  const cardBg = useColorModeValue('rgba(255, 255, 255, 0.8)', 'rgba(18, 18, 26, 0.7)')
  const borderColor = useColorModeValue('rgba(0, 100, 80, 0.1)', 'rgba(0, 255, 136, 0.1)')

  const skillCategories = [
    {
      title: 'Languages',
      icon: '💻',
      color: 'brand.green',
      colorHex: '#00ff88',
      skills: [
        { name: 'JavaScript', level: 95 },
        { name: 'TypeScript', level: 90 },
        { name: 'Python', level: 75 },
        { name: 'Java', level: 70 },
        { name: 'SQL', level: 85 },
        { name: 'C++', level: 78 },
      ],
    },
    {
      title: 'Frameworks',
      icon: '⚛️',
      color: 'brand.cyan',
      colorHex: '#00d4ff',
      skills: [
        { name: 'React JS', level: 95 },
        { name: 'Node.js', level: 90 },
        { name: 'Electron JS', level: 88 },
        { name: 'Express.js', level: 85 },
        { name: 'Spring Boot', level: 70 },
        { name: 'Sequelize', level: 85 },
      ],
    },
    {
      title: 'Databases & Tools',
      icon: '🗄️',
      color: 'brand.gold',
      colorHex: '#ffd700',
      skills: [
        { name: 'PostgreSQL', level: 90 },
        { name: 'MySQL', level: 80 },
        { name: 'Git/GitHub', level: 92 },
        { name: 'REST APIs', level: 95 },
        { name: 'WebSocket', level: 85 },
        { name: 'Jest', level: 65 },
      ],
    },
    {
      title: 'Concepts',
      icon: '🧠',
      color: 'brand.red',
      colorHex: '#ff3b5c',
      skills: [
        { name: 'Data Structures', level: 92 },
        { name: 'Algorithms', level: 90 },
        { name: 'OOP', level: 88 },
        { name: 'Design Patterns', level: 80 },
        { name: 'System Design', level: 75 },
        { name: 'AI Integration', level: 70 },
      ],
    },
  ]

  const primaryTech = [
    { name: 'React', icon: '⚛️', desc: 'Frontend Development' },
    { name: 'Node.js', icon: '🟢', desc: 'Backend Services' },
    { name: 'Electron', icon: '⚡', desc: 'Desktop Apps' },
    { name: 'PostgreSQL', icon: '🐘', desc: 'Database' },
    { name: 'TypeScript', icon: '📘', desc: 'Type Safety' },
    { name: 'Sequelize', icon: '🔗', desc: 'ORM' },
  ]

  const designTracks = [
  {
    title: 'Low-Level Design (LLD)',
    icon: '🧩',
    color: 'brand.cyan',
    colorHex: '#00d4ff',
    bullets: [
      'Object modelling for orders, trades, positions & risk components',
      'Clean abstractions for WebSocket feed handlers & real-time flows',
      'Design patterns: Observer, Strategy, Factory & Adapter in actual systems',
      'Thread-safe async flows and idempotent logic in trading pipelines',
      'Modular service + repository layer design using TypeScript & Sequelize',
      'Reusable component architecture for terminals, charts & real-time UI',
    ],
    level: 'SDE-2 Ready',
    depth: 'Used in production-grade HFT/trading systems',
  },
  {
    title: 'High-Level Design (HLD)',
    icon: '🏗️',
    color: 'brand.gold',
    colorHex: '#ffd700',
    bullets: [
      'Designing scalable real-time systems (WebSocket, WebRTC, event streams)',
      'Distributed backend architecture for low-latency workloads',
      'Event-driven pipelines for market data, order flows & async workers',
      'High-throughput Node.js service layer with caching & batching strategies',
      'System reliability: retries, failover, backpressure, idempotency',
      'Modular microservice boundaries: auth, execution, feeds, collaboration',
      'Data modelling & PostgreSQL optimization for high-volume systems',
    ],
    level: 'SDE-2 Ready',
    depth: 'Built around real trading & scalable platforms',
  },
]


  return (
    <Box id="skills" py={20} position="relative">
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
              // Skills
            </Text>
            <Heading
              fontSize={{ base: '3xl', md: '5xl' }}
              fontWeight="800"
              textAlign="center"
            >
              My{' '}
              <Text as="span" color="brand.cyan">
                Tech
              </Text>{' '}
              Arsenal
            </Heading>
          </VStack>
        </MotionBox>

        {/* Primary Tech Stack */}
        <MotionBox
          bg={cardBg}
          backdropFilter="blur(20px)"
          borderRadius="2xl"
          border="1px solid"
          borderColor={borderColor}
          p={8}
          mb={8}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Text fontFamily="mono" fontSize="sm" color="brand.green" mb={6}>
            {'>'} Primary Tech Stack
          </Text>
          <Grid templateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)', lg: 'repeat(6, 1fr)' }} gap={4}>
            {primaryTech.map((tech, index) => (
              <MotionBox
                key={tech.name}
                bg={useColorModeValue('gray.50', 'rgba(0, 0, 0, 0.2)')}
                borderRadius="xl"
                p={4}
                textAlign="center"
                border="1px solid"
                borderColor="transparent"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 + index * 0.05 }}
                _hover={{
                  borderColor: 'brand.green',
                  transform: 'translateY(-5px)',
                  boxShadow: '0 10px 40px rgba(0, 255, 136, 0.1)',
                }}
              >
                <Text fontSize="3xl" mb={2}>{tech.icon}</Text>
                <Text fontWeight="700" fontSize="md">{tech.name}</Text>
                <Text fontFamily="mono" fontSize="xs" color="gray.500">{tech.desc}</Text>
              </MotionBox>
            ))}
          </Grid>
        </MotionBox>

        {/* LLD / HLD – System Design Focus */}
        <MotionBox
          bg={cardBg}
          backdropFilter="blur(20px)"
          borderRadius="2xl"
          border="1px solid"
          borderColor={borderColor}
          p={8}
          mb={8}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <Text fontFamily="mono" fontSize="sm" color="brand.green" mb={4}>
            {'>'} System Design Focus
          </Text>

          <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={6}>
            {designTracks.map((track, index) => (
              <MotionBox
                key={track.title}
                borderRadius="2xl"
                border="1px solid"
                borderColor="transparent"
                bg={`linear-gradient(135deg, ${track.colorHex}22, transparent)`}
                p={4}
                initial={{ opacity: 0, y: 20, scale : 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 + index * 0.1 }}
                _hover={{
                  borderColor: `${track.colorHex}`,
                  transform: 'translateY(-5px)',
                  boxShadow: '0 10px 40px rgba(0, 255, 136, 0.1 )',
                }}
              >
                {/* Header */}
                <HStack mb={4} spacing={3} align="center">
                  <Box
                    w="40px"
                    h="40px"
                    borderRadius="xl"
                    bg={`${track.colorHex}20`}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Text fontSize="xl">{track.icon}</Text>
                  </Box>
                  <VStack align="flex-start" spacing={0}>
                    <Text fontWeight="700" fontSize="lg">
                      {track.title}
                    </Text>
                    <HStack spacing={2} fontSize="xs" fontFamily="mono">
                      <Box
                        px={2}
                        py={0.5}
                        borderRadius="full"
                        bg="blackAlpha.700"
                        color={track.color}
                      >
                        {track.level}
                      </Box>
                      <Box
                        px={2}
                        py={0.5}
                        borderRadius="full"
                        bg="blackAlpha.600"
                        color="gray.300"
                      >
                        {track.depth}
                      </Box>
                    </HStack>
                  </VStack>
                </HStack>

                {/* Bullets – fixed alignment */}
                <VStack align="flex-start" spacing={2}>
                  {track.bullets.map((line) => (
                    <HStack
                      key={line}
                      spacing={3}
                      align="flex-start"
                      width="100%"
                    >
                      <Box
                        mt="6px"
                        w="7px"
                        h="7px"
                        flexShrink={0}
                        borderRadius="full"
                        bg={track.color}
                        boxShadow={`0 0 10px ${track.colorHex}`}
                      />
                      <Text
                        fontSize="sm"
                        color="gray.300"
                        lineHeight="1.5"
                      >
                        {line}
                      </Text>
                    </HStack>
                  ))}
                </VStack>
              </MotionBox>
            ))}
          </Grid>
        </MotionBox>

        {/* Skills Grid */}
        <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={6}>
          {skillCategories.map((category, catIndex) => (
            <MotionBox
              key={category.title}
              bg={cardBg}
              backdropFilter="blur(20px)"
              borderRadius="2xl"
              border="1px solid"
              borderColor={borderColor}
              p={6}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 + catIndex * 0.1 }}
              _hover={{
                borderColor: category.color,
              }}
            >
              <HStack mb={6}>
                <Box
                  w="40px"
                  h="40px"
                  borderRadius="lg"
                  bg={`${category.colorHex}15`}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Text fontSize="xl">{category.icon}</Text>
                </Box>
                <Text fontWeight="700" fontSize="lg">{category.title}</Text>
              </HStack>

              <VStack spacing={4} align="stretch">
                {category.skills.map((skill, skillIndex) => (
                  <MotionBox
                    key={skill.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.2 + skillIndex * 0.05 }}
                  >
                    <Flex justify="space-between" mb={1}>
                      <Text fontSize="sm" fontWeight="500">{skill.name}</Text>
                      <Text fontFamily="mono" fontSize="xs" color={category.color}>
                        {skill.level}%
                      </Text>
                    </Flex>
                    <Box
                      h="6px"
                      bg={useColorModeValue('gray.100', 'rgba(255, 255, 255, 0.05)')}
                      borderRadius="full"
                      overflow="hidden"
                    >
                      <MotionBox
                        h="full"
                        bg={category.color}
                        borderRadius="full"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.3 + skillIndex * 0.1 }}
                        boxShadow={`0 0 10px ${category.colorHex}80`}
                      />
                    </Box>
                  </MotionBox>
                ))}
              </VStack>
            </MotionBox>
          ))}
        </Grid>
      </Container>
    </Box>
  )
}
