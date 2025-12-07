import {
  Box,
  Container,
  Text,
  HStack,
  VStack,
  useColorModeValue,
  Flex,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'

const MotionBox = motion(Box)

export const Footer = () => {
  const borderColor = useColorModeValue('rgba(0, 100, 80, 0.1)', 'rgba(0, 255, 136, 0.1)')
  const currentYear = new Date().getFullYear()

  return (
    <Box
      borderTop="1px solid"
      borderColor={borderColor}
      py={8}
      position="relative"
    >
      <Container maxW="container.xl">
        <Flex
          direction={{ base: 'column', md: 'row' }}
          justify="space-between"
          align="center"
          gap={4}
        >
          {/* Logo & Copyright */}
          <VStack align={{ base: 'center', md: 'start' }} spacing={2}>
            <HStack spacing={2}>
              <Box
                w="8px"
                h="8px"
                borderRadius="full"
                bg="brand.green"
                boxShadow="0 0 10px rgba(0, 255, 136, 0.5)"
              />
              <Text
                fontFamily="mono"
                fontWeight="700"
                fontSize="md"
                bgGradient="linear(to-r, brand.green, brand.cyan)"
                bgClip="text"
              >
                BISHAL.DEV
              </Text>
            </HStack>
          </VStack>

          {/* Built With */}
          <HStack spacing={1} fontSize="sm" color="gray.500">
            <Text fontFamily="mono" fontSize="xs" color="gray.500">
              © {currentYear} Bishal Suvechha. All rights reserved.
            </Text>
          </HStack>

          {/* Social Links */}
          <HStack spacing={4}>
            <SocialIcon href="https://github.com/xor09" icon={<FiGithub size={18} />} label="GitHub" />
            <SocialIcon href="https://www.linkedin.com/in/suvechha-bishal/" icon={<FiLinkedin size={18} />} label="LinkedIn" />
            <SocialIcon href="mailto:suvechhabishal@gmail.com" icon={<FiMail size={18} />} label="Email" />
          </HStack>
        </Flex>

        {/* Decorative line */}
        <MotionBox
          mt={8}
          h="2px"
          bgGradient="linear(to-r, transparent, brand.green, brand.cyan, transparent)"
          borderRadius="full"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        />

        {/* Quick Stats */}
        <Flex
          mt={6}
          justify="center"
          gap={{ base: 4, md: 8 }}
          flexWrap="wrap"
        >
          <StatBadge label="LeetCode" value="1970" color="brand.gold" />
          <StatBadge label="Problems" value="1250+" color="brand.green" />
          <StatBadge label="Experience" value="2+ yrs" color="brand.cyan" />
          <StatBadge label="CGPA" value="9.01" color="brand.green" />
        </Flex>

        {/* Terminal signature */}
        <Box mt={8} textAlign="center">
          <Text fontFamily="mono" fontSize="xs" color="gray.600">
            <Text as="span" color="brand.green">{'>'}</Text> console.log(
            <Text as="span" color="brand.gold">"Thanks for visiting!"</Text>);
          </Text>
        </Box>
      </Container>
    </Box>
  )
}

const SocialIcon = ({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) => (
  <Box
    as="a"
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    p={2}
    borderRadius="lg"
    color="gray.400"
    _hover={{
      color: 'brand.green',
      bg: 'rgba(0, 255, 136, 0.1)',
    }}
    transition="all 0.2s ease"
    aria-label={label}
    data-cursor-hover
  >
    {icon}
  </Box>
)

const StatBadge = ({ label, value, color }: { label: string; value: string; color: string }) => (
  <HStack
    bg="rgba(0, 0, 0, 0.2)"
    px={3}
    py={1}
    borderRadius="full"
    fontSize="xs"
  >
    <Text color="gray.500" fontFamily="mono">{label}:</Text>
    <Text color={color} fontFamily="mono" fontWeight="600">{value}</Text>
  </HStack>
)
