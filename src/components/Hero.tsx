import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  HStack,
  VStack,
  Flex,
  useColorModeValue,
  Image,
  Badge,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { LiveChart } from './LiveChart'
import { BullIcon, CandlestickPattern, CircuitPattern } from './TradingSVGs'
import { FiGithub, FiLinkedin, FiMail, FiDownload } from 'react-icons/fi'

const MotionBox = motion(Box)
const MotionHeading = motion(Heading)
const MotionText = motion(Text)

export const Hero = () => {
  const cardBg = useColorModeValue('rgba(255, 255, 255, 0.8)', 'rgba(18, 18, 26, 0.7)')
  const borderColor = useColorModeValue('rgba(0, 100, 80, 0.1)', 'rgba(0, 255, 136, 0.1)')

  return (
    <Box
      id="hero"
      minH="100vh"
      pt="140px"
      pb={20}
      position="relative"
      overflow="hidden"
    >
      <CircuitPattern />
      
      <Container maxW="container.xl" position="relative" zIndex={2}>
        <Flex
          direction={{ base: 'column', lg: 'row' }}
          align="center"
          justify="space-between"
          gap={12}
        >
          {/* Left Content */}
          <VStack align={{ base: 'center', lg: 'flex-start' }} spacing={6} flex={1}>
            <MotionBox
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge
                bg="rgba(0, 255, 136, 0.1)"
                color="brand.green"
                px={4}
                py={2}
                borderRadius="full"
                border="1px solid"
                borderColor="brand.green"
                fontFamily="mono"
                fontSize="xs"
                textTransform="uppercase"
                letterSpacing="wider"
              >
                <HStack spacing={2}>
                  <Box w="6px" h="6px" borderRadius="full" bg="brand.green" className="pulse" />
                  <Text>Available for Opportunities</Text>
                </HStack>
              </Badge>
            </MotionBox>

            <MotionHeading
              as="h1"
              fontSize={{ base: '4xl', md: '6xl', lg: '7xl' }}
              fontWeight="800"
              lineHeight="0.95"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              textAlign={{ base: 'center', lg: 'left' }}
            >
              <Text as="span" color={useColorModeValue('gray.800', 'white')}>
                Hi, I'm{' '}
              </Text>
              <Text
                as="span"
                bgGradient="linear(to-r, brand.green, brand.cyan)"
                bgClip="text"
                className="text-glow-green"
              >
                Bishal
              </Text>
            </MotionHeading>

            <MotionText
              fontSize={{ base: 'xl', md: '2xl' }}
              fontFamily="mono"
              color={useColorModeValue('gray.600', 'gray.400')}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              textAlign={{ base: 'center', lg: 'left' }}
            >
              Software Development Engineer {' '}
              <Text as="span" color="brand.red">@</Text>{' '}
              <Text as="span" color="brand.cyan">HFT Firm</Text>
            </MotionText>

            <MotionText
              fontSize={{ base: 'md', md: 'lg' }}
              color={useColorModeValue('gray.500', 'gray.500')}
              maxW="500px"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              textAlign={{ base: 'center', lg: 'left' }}
            >
              Building high-performance trading systems with React, Node.js, 
              Electron & PostgreSQL. Specializing in low-latency UIs and 
              real-time data processing.
            </MotionText>

            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <HStack spacing={4} flexWrap="wrap" justify={{ base: 'center', lg: 'flex-start' }}>
                <Button
                  as="a"
                  href="#contact"
                  variant="tradingFilled"
                  size="lg"
                  fontFamily="mono"
                  leftIcon={<FiMail />}
                  data-cursor-hover
                >
                  GET IN TOUCH
                </Button>
                <Button
                  as="a"
                  href="/resume.pdf"
                  download
                  variant="trading"
                  size="lg"
                  fontFamily="mono"
                  leftIcon={<FiDownload />}
                  data-cursor-hover
                >
                  RESUME
                </Button>
              </HStack>
            </MotionBox>

            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <HStack spacing={4} pt={4}>
                <IconLink href="https://github.com/xor09" icon={<FiGithub size={20} />} label="GitHub" />
                <IconLink href="https://linkedin.com/in/bishal" icon={<FiLinkedin size={20} />} label="LinkedIn" />
              </HStack>
            </MotionBox>
          </VStack>

          {/* Right Content - Profile Card */}
          <MotionBox
            flex={1}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <Box
              position="relative"
              maxW="450px"
              mx="auto"
            >
              {/* Decorative elements */}
              <Box position="absolute" top="-30px" right="-30px" opacity={0.5}>
                <BullIcon size={80} />
              </Box>
              
              <Box
                bg={cardBg}
                backdropFilter="blur(20px)"
                borderRadius="2xl"
                border="1px solid"
                borderColor={borderColor}
                overflow="hidden"
                boxShadow="0 25px 50px -12px rgba(0, 0, 0, 0.25)"
              >
                {/* Card Header with Live Chart */}
                <Box
                  bg="rgba(0, 255, 136, 0.05)"
                  borderBottom="1px solid"
                  borderColor={borderColor}
                  p={4}
                >
                  <Flex justify="space-between" align="center" mb={2}>
                    <HStack>
                      <Box w="8px" h="8px" borderRadius="full" bg="brand.red" />
                      <Box w="8px" h="8px" borderRadius="full" bg="brand.gold" />
                      <Box w="8px" h="8px" borderRadius="full" bg="brand.green" />
                    </HStack>
                    <Text fontFamily="mono" fontSize="xs" color="gray.500">
                      portfolio.tsx
                    </Text>
                  </Flex>
                  <LiveChart width={380} height={80} volatility={2} />
                </Box>

                {/* Profile Section */}
                <Box p={6}>
                  <Flex gap={4} align="center" mb={4}>
                    {/* Profile Image Placeholder */}
                    <Box
                      w="80px"
                      h="80px"
                      borderRadius="xl"
                      bg="rgba(0, 255, 136, 0.1)"
                      border="2px solid"
                      borderColor="brand.green"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      overflow="hidden"
                    >
                      {/* Replace with your image */}
                      <Image
                        src="https://via.placeholder.com/80x80/0a0a0f/00ff88?text=BS"
                        alt="Bishal Suvechha"
                        w="full"
                        h="full"
                        objectFit="cover"
                        fallback={
                          <Text
                            fontFamily="mono"
                            fontSize="2xl"
                            fontWeight="bold"
                            color="brand.green"
                          >
                            BS
                          </Text>
                        }
                      />
                    </Box>
                    <VStack align="start" spacing={0}>
                      <Text fontWeight="700" fontSize="lg">Bishal Suvechha</Text>
                      <Text fontFamily="mono" fontSize="sm" color="brand.green">
                        @bishal.dev
                      </Text>
                      <Text fontSize="xs" color="gray.500">
                        Vapi, Gujarat
                      </Text>
                    </VStack>
                  </Flex>

                  {/* Stats */}
                  <Flex
                    bg={useColorModeValue('gray.50', 'rgba(0, 0, 0, 0.2)')}
                    borderRadius="xl"
                    p={4}
                    justify="space-around"
                  >
                    <StatItem label="Experience" value="2+" suffix="yrs" />
                    <StatItem label="LeetCode" value="1970" isRating trend="up" />
                    <StatItem label="Problems" value="1250+" trend="up" />
                  </Flex>

                  {/* Tech Tags */}
                  <Flex flexWrap="wrap" gap={2} mt={4}>
                    {['React', 'Node.js', 'Electron', 'PostgreSQL', 'TypeScript'].map((tech) => (
                      <Badge
                        key={tech}
                        bg="rgba(0, 212, 255, 0.1)"
                        color="brand.cyan"
                        px={3}
                        py={1}
                        borderRadius="full"
                        fontFamily="mono"
                        fontSize="xs"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </Flex>
                </Box>

                {/* Candlestick decoration */}
                <Box
                  position="absolute"
                  bottom="0"
                  left="0"
                  right="0"
                  opacity={0.3}
                  pointerEvents="none"
                >
                  <CandlestickPattern />
                </Box>
              </Box>
            </Box>
          </MotionBox>
        </Flex>
      </Container>
    </Box>
  )
}

const IconLink = ({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) => (
  <Box
    as="a"
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    p={3}
    borderRadius="xl"
    border="1px solid"
    borderColor="rgba(0, 255, 136, 0.2)"
    color="gray.400"
    _hover={{
      color: 'brand.green',
      borderColor: 'brand.green',
      bg: 'rgba(0, 255, 136, 0.05)',
      transform: 'translateY(-2px)',
    }}
    transition="all 0.3s ease"
    data-cursor-hover
    aria-label={label}
  >
    {icon}
  </Box>
)

const StatItem = ({ 
  label, 
  value, 
  suffix = '', 
  isRating = false,
  trend 
}: { 
  label: string
  value: string
  suffix?: string
  isRating?: boolean
  trend?: 'up' | 'down'
}) => (
  <VStack spacing={0}>
    <HStack>
      <Text fontFamily="mono" fontWeight="700" fontSize="xl" color={isRating ? 'brand.gold' : 'brand.green'}>
        {value}
      </Text>
      {suffix && (
        <Text fontFamily="mono" fontSize="sm" color="gray.500">{suffix}</Text>
      )}
      {trend && (
        <Text color={trend === 'up' ? 'brand.green' : 'brand.red'} fontSize="xs">
          {trend === 'up' ? '▲' : '▼'}
        </Text>
      )}
    </HStack>
    <Text fontSize="xs" color="gray.500">{label}</Text>
  </VStack>
)
