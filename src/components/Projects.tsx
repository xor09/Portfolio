import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  useColorModeValue,
  Badge,
  Button,
  Grid,
  Image,
  Flex,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { FiExternalLink, FiGithub } from 'react-icons/fi'
import { LiveChart } from './LiveChart'

const MotionBox = motion(Box)

export const Projects = () => {
  const cardBg = useColorModeValue('rgba(255, 255, 255, 0.8)', 'rgba(18, 18, 26, 0.7)')
  const borderColor = useColorModeValue('rgba(0, 100, 80, 0.1)', 'rgba(0, 255, 136, 0.1)')

  const projects = [
    {
      title: 'CoverEase - E-Insurance Platform',
      description:
        'Full-stack insurance web application with JWT authentication, role-based access control, and real-time email notifications. Supports multiple user roles including customers, agents, and admins.',
      image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&h=400&fit=crop',
      tech: ['React JS', 'Spring Boot', 'MySQL', 'JWT', 'REST APIs'],
      features: ['Multi-role Support', 'File Upload/Download', 'Email Notifications', 'JPA & Hibernate'],
      color: 'brand.green',
      github: 'https://github.com/xor09/CoverEasy',
      // live: '#',
    },
    {
      title: 'The House of Movies',
      description:
        'Immersive web platform providing detailed insights and ratings for 2,000+ movies and TV series with trailer viewing capability and real-time data from The MovieDB API.',
      image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&h=400&fit=crop',
      tech: ['React JS', 'HTML', 'CSS', 'Bootstrap', 'MovieDB API'],
      features: ['+35% User Interaction', '99% Data Accuracy', 'Real-time Data', 'Trailer Viewing'],
      color: 'brand.cyan',
      github: 'https://github.com/xor09/thehouseofmovies',
      live: 'https://xor09.github.io/thehouseofmovies/#/',
    },
  ]

  return (
    <Box id="projects" py={20} position="relative">
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
              // Projects
            </Text>
            <Heading
              fontSize={{ base: '3xl', md: '5xl' }}
              fontWeight="800"
              textAlign="center"
            >
              Featured{' '}
              <Text as="span" color="brand.green">
                Builds
              </Text>
            </Heading>
            <Text
              fontSize="lg"
              color="gray.500"
              textAlign="center"
              maxW="600px"
            >
              Production-ready applications demonstrating full-stack expertise
            </Text>
          </VStack>
        </MotionBox>

        <Grid templateColumns={{ base: '1fr', lg: 'repeat(2, 1fr)' }} gap={8}>
          {projects.map((project, index) => (
            <MotionBox
              key={project.title}
              bg={cardBg}
              backdropFilter="blur(20px)"
              borderRadius="2xl"
              border="1px solid"
              borderColor={borderColor}
              overflow="hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
              _hover={{
                borderColor: project.color,
                boxShadow: `0 0 40px rgba(0, 255, 136, 0.1)`,
                transform: 'translateY(-5px)',
              }}
            >
              {/* Project Image/Preview */}
              <Box
                position="relative"
                h="200px"
                overflow="hidden"
                borderBottom="1px solid"
                borderColor={borderColor}
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  w="full"
                  h="full"
                  objectFit="cover"
                  opacity={0.7}
                />
                <Box
                  position="absolute"
                  inset="0"
                  bgGradient={`linear(to-t, ${useColorModeValue('white', 'brand.dark')}, transparent)`}
                />
                
                {/* Terminal overlay effect */}
                <Box
                  position="absolute"
                  top={4}
                  left={4}
                  bg="rgba(0, 0, 0, 0.7)"
                  backdropFilter="blur(10px)"
                  borderRadius="lg"
                  p={3}
                >
                  <HStack spacing={2} mb={2}>
                    <Box w="8px" h="8px" borderRadius="full" bg="brand.red" />
                    <Box w="8px" h="8px" borderRadius="full" bg="brand.gold" />
                    <Box w="8px" h="8px" borderRadius="full" bg="brand.green" />
                  </HStack>
                  <Text fontFamily="mono" fontSize="xs" color="brand.green">
                    {'>'} npm run build
                  </Text>
                </Box>

                {/* Mini chart */}
                <Box position="absolute" bottom={4} right={4} opacity={0.8}>
                  <LiveChart width={120} height={40} volatility={2} strokeColor={project.color === 'brand.green' ? '#00ff88' : '#00d4ff'} />
                </Box>
              </Box>

              {/* Content */}
              <Box p={6}>
                <VStack align="start" spacing={4}>
                  <HStack justify="space-between" w="full">
                    <Heading fontSize="xl" fontWeight="700">
                      {project.title}
                    </Heading>
                    <HStack>
                      <Button
                        as="a"
                        href={project.github}
                        size="sm"
                        variant="ghost"
                        color="gray.400"
                        _hover={{ color: 'brand.green' }}
                        data-cursor-hover
                        target='_blank'
                      >
                        <FiGithub />
                      </Button>
                      {
                        project.live && (
                          <Button
                            as="a"
                            href={project.live}
                            size="sm"
                            variant="ghost"
                            color="gray.400"
                            _hover={{ color: 'brand.cyan' }}
                            data-cursor-hover
                            target='_blank'
                          >
                            <FiExternalLink />
                          </Button>
                        )
                      }
                    </HStack>
                  </HStack>

                  <Text fontSize="sm" color="gray.500" lineHeight="tall">
                    {project.description}
                  </Text>

                  {/* Features */}
                  <Flex flexWrap="wrap" gap={2}>
                    {project.features.map((feature) => (
                      <Badge
                        key={feature}
                        bg={`rgba(${project.color === 'brand.green' ? '0, 255, 136' : '0, 212, 255'}, 0.1)`}
                        color={project.color}
                        px={3}
                        py={1}
                        borderRadius="full"
                        fontFamily="mono"
                        fontSize="xs"
                      >
                        {feature}
                      </Badge>
                    ))}
                  </Flex>

                  {/* Tech Stack */}
                  <Box pt={4} borderTop="1px solid" borderColor={borderColor} w="full">
                    <Text fontFamily="mono" fontSize="xs" color="gray.500" mb={2}>
                      {'>'} Built with
                    </Text>
                    <Flex flexWrap="wrap" gap={2}>
                      {project.tech.map((tech) => (
                        <Text
                          key={tech}
                          fontFamily="mono"
                          fontSize="xs"
                          color="gray.400"
                          bg={useColorModeValue('gray.100', 'rgba(255, 255, 255, 0.05)')}
                          px={2}
                          py={1}
                          borderRadius="md"
                        >
                          {tech}
                        </Text>
                      ))}
                    </Flex>
                  </Box>
                </VStack>
              </Box>
            </MotionBox>
          ))}
        </Grid>

        {/* More Projects CTA */}
        <MotionBox
          mt={12}
          textAlign="center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Button
            as="a"
            href="https://github.com/xor09"
            target="_blank"
            variant="trading"
            size="lg"
            fontFamily="mono"
            leftIcon={<FiGithub />}
            data-cursor-hover
          >
            VIEW ALL PROJECTS
          </Button>
        </MotionBox>
      </Container>
    </Box>
  )
}
