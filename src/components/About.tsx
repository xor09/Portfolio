import {
  Box,
  Container,
  Heading,
  Text,
  Flex,
  VStack,
  HStack,
  useColorModeValue,
  Grid,
  GridItem,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { LiveChart } from './LiveChart'

const MotionBox = motion(Box)

export const About = () => {
  const cardBg = useColorModeValue('rgba(255, 255, 255, 0.8)', 'rgba(18, 18, 26, 0.7)')
  const borderColor = useColorModeValue('rgba(0, 100, 80, 0.1)', 'rgba(0, 255, 136, 0.1)')

  const stats = [
    { label: 'Order Execution', value: '-50%', desc: 'Time Reduction', color: 'brand.green' },
    { label: 'Operational Efficiency', value: '+30%', desc: 'Improvement', color: 'brand.cyan' },
    { label: 'Response Time', value: '<1s', desc: 'Consistent', color: 'brand.gold' },
    { label: 'System Uptime', value: '99.9%', desc: 'Availability', color: 'brand.green' },
  ]

  return (
    <Box id="about" py={20} position="relative">
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
              // About Me
            </Text>
            <Heading
              fontSize={{ base: '3xl', md: '5xl' }}
              fontWeight="800"
              textAlign="center"
            >
              Building{' '}
              <Text as="span" color="brand.green">
                High-Performance
              </Text>{' '}
              Systems
            </Heading>
          </VStack>
        </MotionBox>

        <Grid templateColumns={{ base: '1fr', lg: '1fr 1fr' }} gap={8}>
          {/* Left - About Text */}
          <GridItem>
            <MotionBox
              bg={cardBg}
              backdropFilter="blur(20px)"
              borderRadius="2xl"
              border="1px solid"
              borderColor={borderColor}
              p={8}
              h="full"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <VStack align="start" spacing={6}>
                <Box>
                  <HStack mb={4}>
                    <Box w="3px" h="24px" bg="brand.green" borderRadius="full" />
                    <Text fontFamily="mono" fontSize="sm" color="brand.green">
                      WHO I AM
                    </Text>
                  </HStack>
                  <Text fontSize="lg" color={useColorModeValue('gray.700', 'gray.300')} lineHeight="tall">
                    I'm a <Text as="span" color="brand.green" fontWeight="600">SDE (Full stack)</Text> working 
                    at an HFT firm in Vapi, Gujarat. I specialize in building 
                    low-latency, real-time trading systems that handle high-frequency data processing.
                  </Text>
                </Box>

                <Box>
                  <Text fontSize="lg" color={useColorModeValue('gray.700', 'gray.300')} lineHeight="tall">
                    With expertise in <Text as="span" color="brand.cyan" fontWeight="600">React, Node.js, 
                    Electron, and PostgreSQL</Text>, I develop comprehensive Risk Management Systems, 
                    admin panels, and trading interfaces that serve 100+ active users with 
                    consistent sub-2-second response times.
                  </Text>
                </Box>

                <Box>
                  <Text fontSize="lg" color={useColorModeValue('gray.700', 'gray.300')} lineHeight="tall">
                    I'm passionate about optimizing system performance, automating complex workflows, 
                    and exploring AI integration for enhanced trading predictions.
                  </Text>
                </Box>

                {/* Mini chart decoration */}
                <Box w="full" pt={4}>
                  <Text fontFamily="mono" fontSize="xs" color="gray.500" mb={2}>
                    Performance Metrics ▲
                  </Text>
                  <LiveChart width={350} height={60} strokeColor="#00ff88" volatility={1} />
                </Box>
              </VStack>
            </MotionBox>
          </GridItem>

          {/* Right - Stats Grid */}
          <GridItem>
            <Grid templateColumns="repeat(2, 1fr)" gap={4} h="full">
              {stats.map((stat, index) => (
                <MotionBox
                  key={stat.label}
                  bg={cardBg}
                  backdropFilter="blur(20px)"
                  borderRadius="2xl"
                  border="1px solid"
                  borderColor={borderColor}
                  p={6}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                  _hover={{
                    borderColor: stat.color,
                    boxShadow: `0 0 30px rgba(0, 255, 136, 0.1)`,
                    transform: 'translateY(-5px)',
                  }}
                  cursor="default"
                  position="relative"
                  overflow="hidden"
                >
                  <Box
                    position="absolute"
                    top="0"
                    right="0"
                    w="100px"
                    h="100px"
                    bg={`${stat.color}`}
                    opacity={0.03}
                    borderRadius="full"
                    transform="translate(30%, -30%)"
                  />
                  <VStack align="start" spacing={2}>
                    <Text
                      fontFamily="mono"
                      fontSize="3xl"
                      fontWeight="800"
                      color={stat.color}
                      className="text-glow-green"
                    >
                      {stat.value}
                    </Text>
                    <Text fontWeight="600" fontSize="md">
                      {stat.label}
                    </Text>
                    <Text fontSize="sm" color="gray.500">
                      {stat.desc}
                    </Text>
                  </VStack>
                </MotionBox>
              ))}
            </Grid>
          </GridItem>
        </Grid>

        {/* Education */}
        <MotionBox
          mt={8}
          bg={cardBg}
          backdropFilter="blur(20px)"
          borderRadius="2xl"
          border="1px solid"
          borderColor={borderColor}
          p={8}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Flex
            direction={{ base: 'column', md: 'row' }}
            justify="space-between"
            align={{ base: 'start', md: 'center' }}
            gap={4}
          >
            <HStack spacing={4}>
              <Box
                w="50px"
                h="50px"
                borderRadius="xl"
                bg="rgba(0, 212, 255, 0.1)"
                border="1px solid"
                borderColor="brand.cyan"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Text fontSize="xl">🎓</Text>
              </Box>
              <VStack align="start" spacing={0}>
                <Text fontWeight="700" fontSize="lg">
                  B.Tech in Computer Science and Engineering
                </Text>
                <Text color="brand.cyan" fontFamily="mono" fontSize="sm">
                  Amity University, Raipur
                </Text>
              </VStack>
            </HStack>
            <VStack align={{ base: 'start', md: 'end' }} spacing={0}>
              <HStack>
                <Text fontFamily="mono" fontSize="sm" color="gray.500">
                  CGPA:
                </Text>
                <Text fontFamily="mono" fontSize="xl" fontWeight="700" color="brand.green">
                  9.01
                </Text>
              </HStack>
              <Text fontFamily="mono" fontSize="sm" color="gray.500">
                Aug 2019 - July 2023
              </Text>
            </VStack>
          </Flex>
        </MotionBox>
      </Container>
    </Box>
  )
}
