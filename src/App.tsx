import React, { useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  IconButton,
  Stack,
  HStack,
  VStack,
  SimpleGrid,
  Tag,
  useColorMode,
  useColorModeValue,
  Link,
  Divider,
  Badge,
  Image,
  chakra,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import { motion } from "framer-motion";

const MotionBox: any = motion(Box);
const MotionFlex: any = motion(Flex);
const MotionPath: any = motion.path;

const profile = {
  name: "Bishal Suvechha Manindra",
  title: "Fullstack Developer · Trading / HFT Tools",
  location: "Vapi, Gujarat, India",
  phone: "+91-9016236434",
  email: "suvechhabishal@gmail.com",
  links: [
    { label: "LinkedIn", href: "#" }, // TODO
    { label: "GitHub", href: "#" }, // TODO
    { label: "LeetCode", href: "#" }, // TODO
    { label: "HackerEarth", href: "#" }, // TODO
  ],
  summary:
    "Fullstack engineer in a high-frequency trading environment, building low-latency risk and order tools using React, Electron, Node.js, Express and PostgreSQL.",
};

const experience = [
  {
    role: "Software Developer (Fullstack · Trading Systems)",
    company: "HFT Trading Firm (Undisclosed)",
    location: "Vapi, Gujarat",
    period: "Jan 2024 – Present",
    bullets: [
      "Built and maintained a full-stack Risk Management System (RMS) and Order Management tooling for 100+ traders & desks.",
      "Designed low-latency dashboards in React + Electron for traders, portfolios, hedge orders and P&L with ~2s response time.",
      "Implemented Node.js/Express services with PostgreSQL + Sequelize for order routing, limits, and margin logic.",
      "Automated ingestion of NSE daily reference files to eliminate manual ops and reduce human error.",
      "Created reusable admin modules for user/server management, TCP configuration and margin calculator integration.",
      "Worked end-to-end: requirement gathering, data modeling, APIs, UI, testing, deployment and production support.",
      "Experimented with AI-driven margin prediction & trading logic as internal PoC using Python + GPT tools.",
    ],
    stack: [
      "React",
      "Electron",
      "Node.js",
      "Express",
      "PostgreSQL",
      "Sequelize",
      "REST",
      "WebSocket",
    ],
  },
];

const projects = [
  {
    name: "CoverEase – Easy Insurance",
    tech: ["React", "Spring Boot", "MySQL", "Bootstrap", "JWT", "JPA/Hibernate"],
    description:
      "Full-stack E-Insurance platform for customers, agents and admins with secure authentication and role-based access.",
    highlights: [
      "JWT-based authentication and authorization with role-based access control.",
      "File upload/download, policy management and email notifications.",
      "RESTful APIs with JPA/Hibernate and a responsive React UI.",
    ],
  },
  {
    name: "The House of Movies",
    tech: ["React", "HTML/CSS", "Bootstrap", "The MovieDB API"],
    description:
      "Movie and TV show discovery platform with detailed insights and ratings.",
    highlights: [
      "Live data from The MovieDB API for 2,000+ titles.",
      "Trailer viewing and detail pages to boost engagement.",
    ],
  },
];

const skills = {
  languages: ["JavaScript", "TypeScript", "Python", "Java", "SQL", "PostgreSQL"],
  frameworks: [
    "React",
    "Electron",
    "Node.js",
    "Express",
    "Spring Boot",
    "Sequelize",
  ],
  concepts: ["Fullstack Architecture", "REST APIs", "DSA", "OOP", "Design Patterns"],
  tools: [
    "Git",
    "GitHub",
    "Bitbucket",
    "Postman",
    "VS Code",
    "Chrome DevTools",
    "Unix Shell",
  ],
  ai: ["AI margin prediction PoC", "GPT tools", "Workflow automation"],
};

const achievements = [
  {
    label: "LeetCode",
    value: "Knight · 1970",
    desc: "Top ~3% globally, 1250+ problems solved.",
  },
  {
    label: "HackerEarth",
    value: "1848",
    desc: "Global Rank 437 out of 110,000+.",
  },
  {
    label: "CodeKaze Sept 23",
    value: "Rank 14",
    desc: "High-performance coding contest result.",
  },
  {
    label: "GeeksforGeeks",
    value: "Rank 1",
    desc: "Top of institute leaderboard.",
  },
];

const education = [
  {
    degree: "B.Tech in Computer Science and Engineering",
    school: "Amity University Raipur, Chhattisgarh",
    period: "Aug 2019 – Jul 2023",
    details: ["CGPA: 9.01"],
  },
];

const Section: React.FC<any> = ({ id, title, children }) => {
  const accent = useColorModeValue("green.500", "hft.accent");
  return (
    <MotionBox
      id={id}
      mt={{ base: 12, md: 16 }}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.5 }}
    >
      <HStack mb={4} spacing={3} align="center">
        <Heading
          as="h2"
          fontSize={{ base: "xl", md: "2xl" }}
          letterSpacing="wide"
        >
          {title}
        </Heading>
        <Box flex="1" h="1px" bgGradient={`linear(to-r, ${accent}, transparent)`} />
      </HStack>
      {children}
    </MotionBox>
  );
};

const PriceTicker: React.FC = () => {
  const bg = useColorModeValue("gray.900", "blackAlpha.600");
  const border = useColorModeValue("gray.700", "whiteAlpha.200");
  const accent = useColorModeValue("green.400", "hft.accent");

  const items = [
    { symbol: "NIFTY", price: "22,550.20", change: "+0.72%" },
    { symbol: "BANKNIFTY", price: "49,870.80", change: "-0.18%" },
    { symbol: "USDINR", price: "83.12", change: "-0.12%" },
    { symbol: "RMS-UPTIME", price: "99.98%", change: "UP" },
    { symbol: "LATENCY", price: "< 2s UI", change: "STABLE" },
  ];

  return (
    <Box
      mt={3}
      borderRadius="full"
      borderWidth="1px"
      borderColor={border}
      bg={bg}
      overflow="hidden"
      px={4}
      py={1.5}
      fontSize="xs"
      position="relative"
    >
      <MotionFlex
        gap={6}
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        {[...items, ...items].map((item, idx) => (
          <HStack key={idx} spacing={2} minW="max-content">
            <Text fontWeight="semibold" letterSpacing="wide">
              {item.symbol}
            </Text>
            <Text color="gray.300">{item.price}</Text>
            <Text color={item.change.startsWith("-") ? "red.400" : accent}>
              {item.change}
            </Text>
          </HStack>
        ))}
      </MotionFlex>
    </Box>
  );
};

const BullIcon: React.FC<any> = (props) => (
  <chakra.svg
    viewBox="0 0 24 24"
    boxSize="18px"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    {...props}
  >
    <MotionPath
      d="M3 4c2 1 4 1 6 0m12 0c-2 1-4 1-6 0M5 10c1.5-3 4-4 7-4s5.5 1 7 4-1 8-7 8-8.5-5-7-8Z"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 1.2, repeat: Infinity, repeatType: "mirror" }}
    />
    <path d="M9.5 11h.01M14.5 11h.01" strokeLinecap="round" />
  </chakra.svg>
);

const BearIcon: React.FC<any> = (props) => (
  <chakra.svg
    viewBox="0 0 24 24"
    boxSize="18px"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    {...props}
  >
    <path d="M5 7a2 2 0 1 1 4 0M15 7a2 2 0 1 1 4 0" />
    <path d="M4 11c1.2-2.5 3.5-4 8-4s6.8 1.5 8 4-1 7-8 7-9.2-4.5-8-7Z" />
    <path d="M9.5 12h.01M14.5 12h.01" strokeLinecap="round" />
  </chakra.svg>
);

const LiveChart: React.FC = () => {
  const stroke = useColorModeValue("#16a34a", "#22c55e");
  const strokeNeg = useColorModeValue("#dc2626", "#f97373");
  const grid = useColorModeValue(
    "rgba(148,163,184,0.4)",
    "rgba(148,163,184,0.35)"
  );

  return (
    <Box
      borderRadius="xl"
      borderWidth="1px"
      borderColor={grid}
      bgGradient="linear(to-b, blackAlpha.900, blackAlpha.700)"
      p={3}
      position="relative"
      overflow="hidden"
    >
      <Text fontSize="xs" color="gray.400" mb={1}>
        Synthetic P&amp;L Curve (Demo)
      </Text>
      <Box as="svg" viewBox="0 0 200 80" width="100%" height="80px">
        {[20, 40, 60].map((y) => (
          <line
            key={y}
            x1="0"
            x2="200"
            y1={y}
            y2={y}
            stroke={grid}
            strokeWidth="0.5"
          />
        ))}
        <MotionPath
          d="M0 50 L20 45 L40 55 L60 40 L80 42 L100 30 L120 35 L140 25 L160 28 L180 18 L200 22"
          fill="none"
          stroke={stroke}
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.8, repeat: Infinity, repeatType: "reverse" }}
        />
        <MotionPath
          d="M0 30 L20 35 L40 25 L60 38 L80 36 L100 48 L120 45 L140 55 L160 50 L180 62 L200 60"
          fill="none"
          stroke={strokeNeg}
          strokeWidth="1.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3.2, repeat: Infinity, repeatType: "reverse" }}
        />
      </Box>
      <HStack mt={1.5} spacing={3} fontSize="xs" color="gray.400">
        <HStack spacing={1}>
          <Box w="8px" h="8px" borderRadius="full" bg={stroke} />
          <Text>Bull Trend</Text>
        </HStack>
        <HStack spacing={1}>
          <Box w="8px" h="8px" borderRadius="full" bg={strokeNeg} />
          <Text>Bear Phase</Text>
        </HStack>
      </HStack>
    </Box>
  );
};

// Simple logo-like SVGs for tech stack strip
const ReactLogo: React.FC<any> = (props) => (
  <chakra.svg viewBox="0 0 24 24" boxSize="24px" {...props}>
    <circle cx="12" cy="12" r="2.2" fill="currentColor" />
    <ellipse
      cx="12"
      cy="12"
      rx="9"
      ry="4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
    />
    <ellipse
      cx="12"
      cy="12"
      rx="9"
      ry="4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      transform="rotate(60 12 12)"
    />
    <ellipse
      cx="12"
      cy="12"
      rx="9"
      ry="4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      transform="rotate(120 12 12)"
    />
  </chakra.svg>
);

const NodeLogo: React.FC<any> = (props) => (
  <chakra.svg viewBox="0 0 24 24" boxSize="24px" {...props}>
    <path
      d="M12 2 4 6v8l8 4 8-4V6z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
    />
    <path
      d="M10 10.5c0-1 .8-1.8 2-1.8s2 .8 2 1.8V14c0 1-.8 1.8-2 1.8S10 15 10 14v-1"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
    />
  </chakra.svg>
);

const ElectronLogo: React.FC<any> = (props) => (
  <chakra.svg viewBox="0 0 24 24" boxSize="24px" {...props}>
    <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    <MotionPath
      d="M6 7c2-2 6-2 8.5.3 2 2 2.2 4.8.9 6.7"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 1.6, repeat: Infinity, repeatType: "mirror" }}
    />
    <MotionPath
      d="M7 14.5c1.2 2.8 4.2 4.3 6.9 3.2 1.3-.5 2.3-1.5 2.9-2.7"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 1.8, repeat: Infinity, repeatType: "mirror" }}
    />
  </chakra.svg>
);

const PostgresLogo: React.FC<any> = (props) => (
  <chakra.svg viewBox="0 0 24 24" boxSize="24px" {...props}>
    <path
      d="M7 7c0-2 1.7-3 5-3s5 1 5 3v4c0 4-2 7-5 7s-5-3-5-7V7z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
    />
    <path d="M10 11h.01M14 11h.01" stroke="currentColor" strokeWidth="1.4" />
  </chakra.svg>
);

const ExpressLogo: React.FC<any> = (props) => (
  <chakra.svg viewBox="0 0 120 24" width="80px" height="24px" {...props}>
    <text
      x="0"
      y="17"
      fontSize="14"
      fontFamily="system-ui, sans-serif"
      fill="currentColor"
    >
      express
    </text>
  </chakra.svg>
);

const SequelizeLogo: React.FC<any> = (props) => (
  <chakra.svg viewBox="0 0 24 24" boxSize="24px" {...props}>
    <path
      d="M12 2 4 7v10l8 5 8-5V7z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
    />
    <path
      d="M8 9.5 12 7l4 2.5v5L12 17l-4-2.5z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.1"
    />
  </chakra.svg>
);

const App: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const bg = useColorModeValue("gray.50", "hft.bg");
  const surface = useColorModeValue("whiteAlpha.90", "blackAlpha.700");
  const border = useColorModeValue("gray.200", "whiteAlpha.200");
  const textMuted = useColorModeValue("gray.600", "gray.400");

  const [cursorPos, setCursorPos] = useState({ x: -200, y: -200 });

  const handleMouseMove = (e: any) => {
    setCursorPos({ x: e.clientX, y: e.clientY });
  };

  return (
    <Box
      minH="100vh"
      bg={bg}
      overflowX="hidden"
      onMouseMove={handleMouseMove}
      position="relative"
    >
      {/* Glowing cursor spotlight */}
      <MotionBox
        position="fixed"
        top={cursorPos.y - 150}
        left={cursorPos.x - 150}
        width="300px"
        height="300px"
        borderRadius="full"
        pointerEvents="none"
        zIndex={0}
        bgGradient="radial(circle, rgba(34,197,94,0.18), transparent 60%)"
        filter="blur(30px)"
        animate={{ opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Background gradient */}
      <Box
        position="fixed"
        inset="0"
        zIndex={-1}
        bgGradient={useColorModeValue(
          "radial(ellipse at top, #d1fae5 0, transparent 55%), radial(ellipse at bottom, #bfdbfe 0, transparent 55%)",
          "radial(ellipse at top, rgba(34,197,94,0.2) 0, transparent 60%), radial(ellipse at bottom, rgba(59,130,246,0.1) 0, transparent 60%)"
        )}
      />

      <Box
        maxW="1120px"
        mx="auto"
        px={{ base: 4, md: 6 }}
        py={4}
        position="relative"
        zIndex={1}
      >
        {/* NAVBAR */}
        <Flex
          as="header"
          mt={2}
          px={4}
          py={2}
          align="center"
          justify="space-between"
          borderRadius="full"
          borderWidth="1px"
          borderColor={border}
          bg={useColorModeValue("whiteAlpha.80", "blackAlpha.700")}
          backdropFilter="blur(16px)"
          position="sticky"
          top={3}
          zIndex={10}
        >
          <HStack spacing={3}>
            <Box
              w="32px"
              h="32px"
              borderRadius="full"
              bgGradient="linear(to-br, hft.accent, teal.500)"
              display="flex"
              alignItems="center"
              justifyContent="center"
              fontWeight="bold"
              color="black"
            >
              B
            </Box>
            <Box>
              <Text fontSize="sm" fontWeight="semibold">
                {profile.name}
              </Text>
              <Text fontSize="xs" color={textMuted}>
                {profile.title}
              </Text>
            </Box>
          </HStack>

          <HStack
            display={{ base: "none", md: "flex" }}
            spacing={3}
            fontSize="sm"
          >
            <NavLink href="#about">About</NavLink>
            <NavLink href="#tech">Tech Stack</NavLink>
            <NavLink href="#experience">Experience</NavLink>
            <NavLink href="#projects">Projects</NavLink>
            <NavLink href="#skills">Skills</NavLink>
            <NavLink href="#achievements">Competitive</NavLink>
            <NavLink href="#contact">Contact</NavLink>
          </HStack>

          <HStack spacing={2}>
            <IconButton
              size="sm"
              variant="ghost"
              aria-label="Toggle color mode"
              onClick={toggleColorMode}
              icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            />
          </HStack>
        </Flex>

        {/* HERO */}
        <MotionBox
          id="about"
          mt={{ base: 10, md: 14 }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Flex
            direction={{ base: "column-reverse", md: "row" }}
            gap={{ base: 8, md: 10 }}
            align="stretch"
          >
            {/* Left */}
            <Box flex={{ base: "1", md: "3" }}>
              <Text
                fontSize="xs"
                letterSpacing="0.25em"
                textTransform="uppercase"
                color={textMuted}
              >
                Trading · HFT Tools · Fullstack
              </Text>

              <Heading
                mt={2}
                as="h1"
                fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
                lineHeight="short"
              >
                Building{" "}
                <chakra.span color="hft.accent">
                  trading-grade
                </chakra.span>{" "}
                dashboards
                <br />
                with React, Electron &amp; Node.js.
              </Heading>

              <Text mt={3} fontSize="sm" color={textMuted} maxW="560px">
                {profile.summary}
              </Text>

              <HStack spacing={3} mt={6} flexWrap="wrap">
                <Link
                  href="#contact"
                  px={4}
                  py={2}
                  fontSize="sm"
                  borderRadius="full"
                  bg="hft.accent"
                  color="black"
                  fontWeight="semibold"
                  _hover={{ bg: "green.400", textDecoration: "none" }}
                >
                  Contact Me
                </Link>
                <Link
                  href="#projects"
                  px={4}
                  py={2}
                  fontSize="sm"
                  borderRadius="full"
                  borderWidth="1px"
                  borderColor={border}
                  _hover={{ bg: "blackAlpha.200", textDecoration: "none" }}
                >
                  View Projects
                </Link>
              </HStack>

              <HStack mt={6} spacing={4} flexWrap="wrap" fontSize="xs">
                <HStack>
                  <Badge colorScheme="green" borderRadius="full">
                    Fullstack / Trading Tools
                  </Badge>
                </HStack>
                <Text color={textMuted}>{profile.location}</Text>
              </HStack>

              <SimpleGrid mt={8} columns={{ base: 1, sm: 3 }} spacing={3}>
                <StatCard label="Latency" value="< 2s UI" hint="RMS / order flow" />
                <StatCard label="Users" value="100+" hint="traders & desks" />
                <StatCard
                  label="Stack"
                  value="React · Electron"
                  hint="Node.js · PostgreSQL"
                />
              </SimpleGrid>

              <PriceTicker />
            </Box>

            {/* Right */}
            <Box flex={{ base: "1", md: "2" }}>
              <MotionBox
                borderRadius="2xl"
                borderWidth="1px"
                borderColor={border}
                bg={surface}
                backdropFilter="blur(18px)"
                p={4}
                boxShadow="lg"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <Flex direction="column" gap={3}>
                  <Flex
                    gap={4}
                    direction={{ base: "column", sm: "row" }}
                    align={{ base: "center", sm: "stretch" }}
                  >
                    {/* Replace with your image */}
                    <Box flexShrink={0} position="relative">
                      <Box
                        position="absolute"
                        inset="-4"
                        bgGradient="conic-gradient(from 0deg, transparent 0deg, rgba(34,197,94,0.6) 60deg, transparent 120deg)"
                        opacity={0.7}
                        filter="blur(24px)"
                      />
                      <Image
                        src="https://via.placeholder.com/260x260.png?text=Your+Photo"
                        alt="Profile"
                        borderRadius="2xl"
                        boxSize={{ base: "180px", md: "210px" }}
                        objectFit="cover"
                        borderWidth="1px"
                        borderColor={border}
                        position="relative"
                        zIndex={1}
                      />
                    </Box>

                    <VStack align="stretch" spacing={3} flex="1">
                      <Box>
                        <Text fontSize="xs" color={textMuted}>
                          Current Role
                        </Text>
                        <Text fontSize="sm" fontWeight="semibold">
                          Fullstack Developer · Trading Systems
                        </Text>
                      </Box>
                      <Divider opacity={0.3} />
                      <Box fontSize="xs">
                        <Text color={textMuted} mb={1}>
                          Focus Areas
                        </Text>
                        <HStack spacing={2} flexWrap="wrap">
                          <Tag size="sm" borderRadius="full" colorScheme="green">
                            React Dashboards
                          </Tag>
                          <Tag size="sm" borderRadius="full" colorScheme="blue">
                            Electron Desktop Apps
                          </Tag>
                          <Tag size="sm" borderRadius="full" colorScheme="purple">
                            Node.js · Express APIs
                          </Tag>
                          <Tag size="sm" borderRadius="full" colorScheme="teal">
                            PostgreSQL · Sequelize
                          </Tag>
                        </HStack>
                      </Box>
                      <Box fontSize="xs">
                        <Text color={textMuted} mb={1}>
                          Links
                        </Text>
                        <HStack spacing={2} flexWrap="wrap">
                          {profile.links.map((link) => (
                            <Link
                              key={link.label}
                              href={link.href}
                              isExternal
                              fontSize="xs"
                              px={2.5}
                              py={1}
                              borderRadius="full"
                              borderWidth="1px"
                              borderColor={border}
                              _hover={{
                                textDecoration: "none",
                                bg: "whiteAlpha.100",
                              }}
                            >
                              {link.label} <ExternalLinkIcon ml={1} />
                            </Link>
                          ))}
                        </HStack>
                      </Box>
                    </VStack>
                  </Flex>

                  <Flex
                    mt={3}
                    gap={3}
                    align="center"
                    direction={{ base: "column", md: "row" }}
                    w="100%"
                  >
                    <Box flex="3" w="100%">
                      <LiveChart />
                    </Box>
                    <VStack
                      flex="2"
                      align="stretch"
                      spacing={2}
                      fontSize="xs"
                      color={textMuted}
                      w="100%"
                    >
                      <HStack align="flex-start">
                        <BullIcon color="green.400" />
                        <Text>Bullish on clean abstractions &amp; strong observability.</Text>
                      </HStack>
                      <HStack align="flex-start">
                        <BearIcon color="red.400" />
                        <Text>Bearish on flaky dashboards &amp; manual operations.</Text>
                      </HStack>
                      <HStack flexWrap="wrap" spacing={2}>
                        <Tag size="sm" borderRadius="full" colorScheme="green">
                          Live RMS / OMS tools
                        </Tag>
                        <Tag size="sm" borderRadius="full" colorScheme="red">
                          Alerting &amp; Risk Flags
                        </Tag>
                      </HStack>
                    </VStack>
                  </Flex>
                </Flex>
              </MotionBox>
            </Box>
          </Flex>
        </MotionBox>

        {/* TECH STACK STRIP */}
        <Section id="tech" title="Tech Stack for Trading Tools">
          <MotionBox
            borderRadius="2xl"
            borderWidth="1px"
            borderColor={border}
            bg={surface}
            boxShadow="lg"
            px={{ base: 4, md: 6 }}
            py={4}
          >
            <Flex
              direction={{ base: "column", md: "row" }}
              align={{ base: "flex-start", md: "center" }}
              justify="space-between"
              gap={4}
            >
              <VStack align="flex-start" spacing={1}>
                <Text fontSize="sm" color={textMuted}>
                  End-to-end stack optimised for{" "}
                  <chakra.span color="hft.accent" fontWeight="semibold">
                    trading, risk &amp; analytics dashboards
                  </chakra.span>
                  .
                </Text>
                <Text fontSize="xs" color={textMuted}>
                  React &amp; Electron frontends • Node.js/Express services • PostgreSQL + Sequelize
                </Text>
              </VStack>

              <HStack
                spacing={{ base: 4, md: 6 }}
                flexWrap="wrap"
                justify={{ base: "flex-start", md: "flex-end" }}
              >
                <TechLogo label="React">
                  <ReactLogo color="cyan.300" />
                </TechLogo>
                <TechLogo label="Electron">
                  <ElectronLogo color="teal.300" />
                </TechLogo>
                <TechLogo label="Node.js">
                  <NodeLogo color="green.300" />
                </TechLogo>
                <TechLogo label="Express">
                  <ExpressLogo color="gray.100" />
                </TechLogo>
                <TechLogo label="PostgreSQL">
                  <PostgresLogo color="blue.300" />
                </TechLogo>
                <TechLogo label="Sequelize">
                  <SequelizeLogo color="purple.300" />
                </TechLogo>
              </HStack>
            </Flex>
          </MotionBox>
        </Section>

        {/* EXPERIENCE */}
        <Section id="experience" title="Experience">
          <Stack spacing={5}>
            {experience.map((exp) => (
              <MotionBox
                key={exp.company}
                borderRadius="2xl"
                p={5}
                borderWidth="1px"
                borderColor={border}
                bg={surface}
                boxShadow="lg"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5 }}
              >
                <Flex
                  justify="space-between"
                  gap={3}
                  align={{ base: "flex-start", md: "center" }}
                  flexWrap="wrap"
                >
                  <Box>
                    <Heading as="h3" fontSize="lg">
                      {exp.role}
                    </Heading>
                    <Text fontSize="sm" color={textMuted}>
                      {exp.company} · {exp.location}
                    </Text>
                  </Box>
                  <Text fontSize="sm" color={textMuted}>
                    {exp.period}
                  </Text>
                </Flex>

                <Box mt={3}>
                  <Stack as="ul" fontSize="sm" color={textMuted} spacing={2}>
                    {exp.bullets.map((b, i) => (
                      <Box as="li" key={i} pl={1}>
                        {b}
                      </Box>
                    ))}
                  </Stack>
                </Box>

                <HStack spacing={2} mt={4} flexWrap="wrap">
                  {exp.stack.map((s) => (
                    <Tag key={s} size="sm" borderRadius="full">
                      {s}
                    </Tag>
                  ))}
                </HStack>
              </MotionBox>
            ))}
          </Stack>
        </Section>

        {/* PROJECTS */}
        <Section id="projects" title="Projects">
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
            {projects.map((proj) => (
              <MotionBox
                key={proj.name}
                borderRadius="2xl"
                p={5}
                borderWidth="1px"
                borderColor={border}
                bg={surface}
                boxShadow="lg"
                whileHover={{ y: -4, boxShadow: "0 18px 40px rgba(0,0,0,0.45)" }}
                transition={{ duration: 0.2 }}
              >
                <Heading as="h3" fontSize="lg">
                  {proj.name}
                </Heading>
                <Text mt={2} fontSize="sm" color={textMuted}>
                  {proj.description}
                </Text>
                <Stack as="ul" mt={3} spacing={1.5} fontSize="sm" color={textMuted}>
                  {proj.highlights.map((h, i) => (
                    <Box as="li" key={i} pl={1}>
                      {h}
                    </Box>
                  ))}
                </Stack>
                <HStack spacing={2} mt={4} flexWrap="wrap">
                  {proj.tech.map((t) => (
                    <Tag size="sm" borderRadius="full" key={t}>
                      {t}
                    </Tag>
                  ))}
                </HStack>
              </MotionBox>
            ))}
          </SimpleGrid>
        </Section>

        {/* SKILLS */}
        <Section id="skills" title="Skills">
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
            <SkillGroup title="Languages & DB" items={skills.languages} />
            <SkillGroup title="Frameworks & Runtime" items={skills.frameworks} />
            <SkillGroup title="Concepts" items={skills.concepts} />
            <SkillGroup title="Tools" items={skills.tools} />
            <SkillGroup title="AI & Automation" items={skills.ai} />
          </SimpleGrid>
        </Section>

        {/* COMPETITIVE & EDUCATION */}
        <Section
          id="achievements"
          title="Competitive Programming & Achievements"
        >
          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={3}>
            {achievements.map((a) => (
              <MotionBox
                key={a.label}
                borderRadius="2xl"
                p={4}
                borderWidth="1px"
                borderColor={border}
                bg={surface}
                whileHover={{ y: -2 }}
                transition={{ duration: 0.15 }}
              >
                <Text
                  fontSize="xs"
                  color={textMuted}
                  textTransform="uppercase"
                  letterSpacing="0.16em"
                >
                  {a.label}
                </Text>
                <Text mt={1} fontWeight="semibold" fontSize="md">
                  {a.value}
                </Text>
                <Text mt={1} fontSize="xs" color={textMuted}>
                  {a.desc}
                </Text>
              </MotionBox>
            ))}
          </SimpleGrid>

          <Box mt={6}>
            {education.map((edu) => (
              <MotionBox
                key={edu.school}
                borderRadius="2xl"
                p={5}
                borderWidth="1px"
                borderColor={border}
                bg={surface}
                boxShadow="lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5 }}
              >
                <Flex
                  justify="space-between"
                  gap={3}
                  flexWrap="wrap"
                  align="flex-start"
                >
                  <Box>
                    <Heading as="h3" fontSize="md">
                      {edu.degree}
                    </Heading>
                    <Text fontSize="sm" color={textMuted}>
                      {edu.school}
                    </Text>
                  </Box>
                  <Text fontSize="sm" color={textMuted}>
                    {edu.period}
                  </Text>
                </Flex>
                <Stack as="ul" mt={3} spacing={1.5} fontSize="sm" color={textMuted}>
                  {edu.details.map((d, i) => (
                    <Box as="li" key={i} pl={1}>
                      {d}
                    </Box>
                  ))}
                </Stack>
              </MotionBox>
            ))}
          </Box>
        </Section>

        {/* CONTACT */}
        <Section id="contact" title="Contact">
          <MotionBox
            borderRadius="2xl"
            p={5}
            borderWidth="1px"
            borderColor={border}
            bg={surface}
            boxShadow="lg"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5 }}
          >
            <Text fontSize="sm" color={textMuted}>
              If you’re hiring for{" "}
              <chakra.span color="hft.accent" fontWeight="semibold">
                fullstack / trading tools / dashboards
              </chakra.span>{" "}
              and need someone who ships React + Electron + Node.js into live trading
              environments, let&apos;s talk.
            </Text>

            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5} mt={5}>
              <Box>
                <Text fontSize="xs" color={textMuted} textTransform="uppercase">
                  Email
                </Text>
                <Link
                  href={`mailto:${profile.email}`}
                  fontSize="sm"
                  fontWeight="medium"
                >
                  {profile.email}
                </Link>
              </Box>
              <Box>
                <Text fontSize="xs" color={textMuted} textTransform="uppercase">
                  Phone
                </Text>
                <Link href={`tel:${profile.phone}`} fontSize="sm" fontWeight="medium">
                  {profile.phone}
                </Link>
              </Box>
            </SimpleGrid>

            <HStack spacing={2} mt={5} flexWrap="wrap">
              {profile.links.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  isExternal
                  fontSize="xs"
                  px={3}
                  py={1.5}
                  borderRadius="full"
                  borderWidth="1px"
                  borderColor={border}
                  _hover={{ bg: "whiteAlpha.100", textDecoration: "none" }}
                >
                  {link.label} <ExternalLinkIcon ml={1} />
                </Link>
              ))}
            </HStack>
          </MotionBox>
        </Section>

        {/* FOOTER */}
        <Flex
          as="footer"
          justify="space-between"
          fontSize="xs"
          color={textMuted}
          mt={10}
          mb={6}
          flexWrap="wrap"
          gap={2}
        >
          <Text>© {new Date().getFullYear()} {profile.name}</Text>
          <Text>Built with React, Chakra UI &amp; Framer Motion</Text>
        </Flex>
      </Box>
    </Box>
  );
};

const NavLink: React.FC<any> = ({ children, ...rest }) => {
  const textMuted = useColorModeValue("gray.600", "gray.400");
  return (
    <Link
      {...rest}
      color={textMuted}
      _hover={{ color: "white", textDecoration: "none" }}
      fontSize="xs"
    >
      {children}
    </Link>
  );
};

const StatCard: React.FC<any> = ({ label, value, hint }) => {
  const border = useColorModeValue("gray.200", "whiteAlpha.200");
  const textMuted = useColorModeValue("gray.600", "gray.400");
  return (
    <Box
      borderRadius="lg"
      borderWidth="1px"
      borderColor={border}
      px={3}
      py={3}
      bgGradient={useColorModeValue(
        "linear(to-br, white, gray.50)",
        "linear(to-br, blackAlpha.700, blackAlpha.500)"
      )}
      boxShadow="md"
      w="100%"
    >
      <Text fontSize="xs" color={textMuted}>
        {label}
      </Text>
      <Text fontSize="md" fontWeight="semibold">
        {value}
      </Text>
      {hint && (
        <Text fontSize="xs" color={textMuted} mt={0.5}>
          {hint}
        </Text>
      )}
    </Box>
  );
};

const SkillGroup: React.FC<any> = ({ title, items }) => {
  const border = useColorModeValue("gray.200", "whiteAlpha.200");
  const textMuted = useColorModeValue("gray.600", "gray.400");
  return (
    <Box
      borderRadius="2xl"
      borderWidth="1px"
      borderColor={border}
      p={4}
      bg={useColorModeValue("whiteAlpha.90", "blackAlpha.700")}
      boxShadow="lg"
    >
      <Text
        fontSize="sm"
        fontWeight="semibold"
        mb={2}
        textTransform="uppercase"
        letterSpacing="0.12em"
        color={textMuted}
      >
        {title}
      </Text>
      <HStack spacing={2} flexWrap="wrap">
        {items.map((item: string) => (
          <Tag key={item} size="sm" borderRadius="full">
            {item}
          </Tag>
        ))}
      </HStack>
    </Box>
  );
};

const TechLogo: React.FC<any> = ({ label, children }) => {
  const textMuted = useColorModeValue("gray.600", "gray.400");
  return (
    <VStack spacing={1} minW="72px">
      <Box
        borderRadius="full"
        p={2}
        bgGradient="linear(to-br, blackAlpha.900, blackAlpha.600)"
        borderWidth="1px"
        borderColor="whiteAlpha.200"
      >
        {children}
      </Box>
      <Text fontSize="xs" color={textMuted}>
        {label}
      </Text>
    </VStack>
  );
};

export default App;
