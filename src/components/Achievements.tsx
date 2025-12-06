import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  useColorModeValue,
  Grid,
  Badge,
  Flex,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { LiveChart } from './LiveChart'

const MotionBox = motion(Box)

export const Achievements = () => {
  const cardBg = useColorModeValue('rgba(255, 255, 255, 0.8)', 'rgba(18, 18, 26, 0.7)')
  const borderColor = useColorModeValue('rgba(0, 100, 80, 0.1)', 'rgba(0, 255, 136, 0.1)')

  const achievements = [
    {
      platform: 'LeetCode',
      title: 'Knight',
      rating: '1970',
      rank: 'Top 3% Global',
      stat: '1250+',
      statLabel: 'Problems Solved',
      icon: '🏆',
      color: 'brand.gold',
      colorHex: '#ffd700',
    },
    {
      platform: 'HackerEarth',
      title: 'Expert',
      rating: '1848',
      rank: '#437 / 110,000+',
      stat: 'Global',
      statLabel: 'Competitive Ranking',
      icon: '⚔️',
      color: 'brand.green',
      colorHex: '#00ff88',
    },
    {
      platform: 'Codekaze',
      title: 'Sept 2023',
      rating: '#14',
      rank: 'Global Rank',
      stat: 'Top',
      statLabel: 'Performer',
      icon: '🚀',
      color: 'brand.cyan',
      colorHex: '#00d4ff',
    },
    {
      platform: 'GeeksforGeeks',
      title: 'Institute Rank',
      rating: '#1',
      rank: 'Top in University',
      stat: 'First',
      statLabel: 'Position',
      icon: '🥇',
      color: 'brand.green',
      colorHex: '#00ff88',
    },
  ]

  const additionalAchievements = [
    {
      title: 'SIH 2022',
      description: 'Qualified at University Level',
      icon: '🏛️',
    },
    {
      title: 'B.Tech CSE',
      description: '9.01 (CGPA) - Amity University',
      icon: '🎓',
    },
  ]

  return (
    <Box id="achievements" py={20} position="relative">
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
              // Achievements
            </Text>
            <Heading
              fontSize={{ base: '3xl', md: '5xl' }}
              fontWeight="800"
              textAlign="center"
            >
              Competitive{' '}
              <Text as="span" color="brand.gold">
                Edge
              </Text>
            </Heading>
            <Text
              fontSize="lg"
              color="gray.500"
              textAlign="center"
              maxW="600px"
            >
              Consistent performer in algorithmic problem solving
            </Text>
          </VStack>
        </MotionBox>

        {/* Main Achievement Cards */}
        <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={6} mb={8}>
          {achievements.map((achievement, index) => (
            <MotionBox
              key={achievement.platform}
              bg={cardBg}
              backdropFilter="blur(20px)"
              borderRadius="2xl"
              border="1px solid"
              borderColor={borderColor}
              overflow="hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
              _hover={{
                borderColor: achievement.color,
                boxShadow: `0 0 40px ${achievement.colorHex}20`,
                transform: 'translateY(-5px)',
              }}
            >
              {/* Header with chart */}
              <Box
                bg={`${achievement.colorHex}08`}
                borderBottom="1px solid"
                borderColor={borderColor}
                p={4}
              >
                <Flex justify="space-between" align="start">
                  <HStack>
                    <Box
                      w="45px"
                      h="45px"
                      borderRadius="xl"
                      bg={`${achievement.colorHex}15`}
                      border="1px solid"
                      borderColor={achievement.color}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Text fontSize="xl">{achievement.icon}</Text>
                    </Box>
                    <VStack align="start" spacing={0}>
                      <Text fontWeight="700" fontSize="lg">{achievement.platform}</Text>
                      <Badge
                        bg={`${achievement.colorHex}20`}
                        color={achievement.color}
                        fontFamily="mono"
                        fontSize="xs"
                      >
                        {achievement.title}
                      </Badge>
                    </VStack>
                  </HStack>
                  <Box>
                    <LiveChart width={100} height={40} volatility={1.5} strokeColor={achievement.colorHex} />
                  </Box>
                </Flex>
              </Box>

              {/* Stats */}
              <Box p={6}>
                <Flex justify="space-around" textAlign="center">
                  <VStack spacing={0}>
                    <Text
                      fontFamily="mono"
                      fontSize="3xl"
                      fontWeight="800"
                      color={achievement.color}
                      textShadow={`0 0 20px ${achievement.colorHex}50`}
                    >
                      {achievement.rating}
                    </Text>
                    <Text fontSize="xs" color="gray.500">Rating</Text>
                  </VStack>
                  <Box w="1px" bg={borderColor} />
                  <VStack spacing={0}>
                    <Text fontFamily="mono" fontSize="md" fontWeight="600" color={useColorModeValue('gray.700', 'gray.300')}>
                      {achievement.rank}
                    </Text>
                    <Text fontSize="xs" color="gray.500">{achievement.statLabel}</Text>
                  </VStack>
                </Flex>
              </Box>
            </MotionBox>
          ))}
        </Grid>

        {/* Additional Achievements */}
        <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={4}>
          {additionalAchievements.map((item, index) => (
            <MotionBox
              key={item.title}
              bg={cardBg}
              backdropFilter="blur(20px)"
              borderRadius="xl"
              border="1px solid"
              borderColor={borderColor}
              p={5}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
              _hover={{
                borderColor: 'brand.green',
              }}
            >
              <HStack spacing={4}>
                <Text fontSize="2xl">{item.icon}</Text>
                <VStack align="start" spacing={0}>
                  <Text fontWeight="700">{item.title}</Text>
                  <Text fontSize="sm" color="gray.500">{item.description}</Text>
                </VStack>
              </HStack>
            </MotionBox>
          ))}
        </Grid>

        {/* Quote */}
        <MotionBox
          mt={12}
          textAlign="center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Text
            fontFamily="mono"
            fontSize="lg"
            color="gray.500"
            fontStyle="italic"
          >
            "Consistency is the key to success in competitive programming"
          </Text>
        </MotionBox>
      </Container>
    </Box>
  )
}
