import {
  Box,
  Flex,
  HStack,
  IconButton,
  Button,
  useColorMode,
  useColorModeValue,
  Container,
  Text,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  VStack,
  Switch,
} from '@chakra-ui/react'
import { MoonIcon, SunIcon, HamburgerIcon } from '@chakra-ui/icons'
import { motion } from 'framer-motion'

const MotionBox = motion(Box)

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Contact', href: '#contact' },
]

export const Navbar = (props: any) => {
  const { boostEnabled, handleBoostToggle } = props
  const { colorMode, toggleColorMode } = useColorMode()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const bgColor = useColorModeValue('rgba(245, 247, 250, 0.8)', 'rgba(10, 10, 15, 0.8)')
  const borderColor = useColorModeValue('rgba(0, 100, 80, 0.1)', 'rgba(0, 255, 136, 0.1)')



  return (
    <MotionBox
      position="fixed"
      top="50px"
      left="0"
      right="0"
      zIndex="99"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Container maxW="container.xl">
        <Flex
          bg={bgColor}
          backdropFilter="blur(20px)"
          borderBottomRadius="2xl"
          border="1px solid"
          borderColor={borderColor}
          px={6}
          py={3}
          align="center"
          justify="space-between"
          boxShadow="0 4px 30px rgba(0, 0, 0, 0.1)"
        >
          <HStack spacing={2}>
            <Box
              w="10px"
              h="10px"
              borderRadius="full"
              bg="brand.green"
              boxShadow="0 0 10px rgba(0, 255, 136, 0.5)"
              className="pulse"
            />
            <Text
              fontFamily="mono"
              fontWeight="700"
              fontSize="lg"
              bgGradient="linear(to-r, brand.green, brand.cyan)"
              bgClip="text"
            >
              BISHAL.DEV
            </Text>
          </HStack>

          {/* Desktop Nav */}
          <HStack spacing={1} display={{ base: 'none', md: 'flex' }}>
            {navItems.map((item) => (
              <Button
                key={item.label}
                as="a"
                href={item.href}
                variant="ghost"
                size="sm"
                fontWeight="500"
                fontFamily="mono"
                fontSize="xs"
                color={useColorModeValue('gray.600', 'gray.400')}
                _hover={{
                  color: 'brand.green',
                  bg: 'rgba(0, 255, 136, 0.1)',
                }}
                data-cursor-hover
              >
                {item.label}
              </Button>
            ))}
          </HStack>

          <HStack spacing={3}>
            {/* BOOST toggle (real switch) */}
            <HStack spacing={1} align="center">
              <Text
                fontFamily="mono"
                fontSize="xs"
                color={boostEnabled ? 'brand.green' : 'gray.500'}
              >
                BOOST
              </Text>
              <Switch
                size="sm"
                isChecked={boostEnabled}
                onChange={handleBoostToggle}
                colorScheme="green"
              />
            </HStack>
            <IconButton
              aria-label="Toggle color mode"
              icon={colorMode === 'dark' ? <SunIcon /> : <MoonIcon />}
              onClick={toggleColorMode}
              variant="ghost"
              size="sm"
              color="brand.green"
              _hover={{
                bg: 'rgba(0, 255, 136, 0.1)',
              }}
              data-cursor-hover
            />
            <Button
              as="a"
              href="#contact"
              variant="trading"
              size="sm"
              fontFamily="mono"
              fontSize="xs"
              display={{ base: 'none', md: 'flex' }}
              data-cursor-hover
            >
              HIRE ME
            </Button>
            <IconButton
              aria-label="Open menu"
              icon={<HamburgerIcon />}
              onClick={onOpen}
              variant="ghost"
              size="sm"
              display={{ base: 'flex', md: 'none' }}
              color="brand.green"
            />
          </HStack>
        </Flex>
      </Container>

      {/* Mobile Drawer */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay backdropFilter="blur(10px)" />
        <DrawerContent
          bg={useColorModeValue('white', 'brand.dark')}
          borderLeft="1px solid"
          borderColor={borderColor}
        >
          <DrawerCloseButton color="brand.green" />
          <DrawerBody pt={16}>
            <VStack spacing={4} align="stretch">
              {navItems.map((item) => (
                <Button
                  key={item.label}
                  as="a"
                  href={item.href}
                  variant="ghost"
                  size="lg"
                  fontFamily="mono"
                  justifyContent="flex-start"
                  onClick={onClose}
                  _hover={{
                    color: 'brand.green',
                    bg: 'rgba(0, 255, 136, 0.1)',
                  }}
                >
                  {item.label}
                </Button>
              ))}
              
              {/* BOOST in mobile menu if you want there too */}
              <HStack
                justify="space-between"
                align="center"
                mt={4}
                px={1}
              >
                <Text
                  fontFamily="mono"
                  fontSize="sm"
                  color={boostEnabled ? 'brand.green' : 'gray.500'}
                >
                  BOOST
                </Text>
                <Switch
                  size="md"
                  isChecked={boostEnabled}
                  onChange={handleBoostToggle}
                  colorScheme="green"
                />
              </HStack>

              <Button
                as="a"
                href="#contact"
                variant="tradingFilled"
                size="lg"
                fontFamily="mono"
                mt={4}
                onClick={onClose}
              >
                HIRE ME
              </Button>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </MotionBox>
  )
}
