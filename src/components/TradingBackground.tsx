import { Box, useColorModeValue } from '@chakra-ui/react'
import { motion } from 'framer-motion'

const MotionBox = motion(Box)

const floatVariants = {
  animate: (custom: number) => ({
    y: [0, -15, 0],
    x: [0, custom * 8, 0],
    transition: {
      duration: 6 + Math.random() * 4,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  }),
}

const GeoArrowUpSVG = ({ size = 80, opacity = 0.12 }: { size?: number; opacity?: number }) => (
  <svg width={size} height={size * 1.5} viewBox="0 0 80 120" fill="none" opacity={opacity}>
    <defs>
      <linearGradient id="arrowUpG" x1="0%" y1="100%" x2="0%" y2="0%">
        <stop offset="0%" stopColor="#00ff88" stopOpacity="0.1" />
        <stop offset="100%" stopColor="#00ff88" stopOpacity="0.5" />
      </linearGradient>
    </defs>
    <g stroke="#00ff88" strokeWidth="0.5">
      <polygon points="40,5 15,45 30,45 30,115 50,115 50,45 65,45" fill="url(#arrowUpG)" />
      <line x1="40" y1="5" x2="40" y2="115" strokeDasharray="2 4" />
      <line x1="15" y1="45" x2="65" y2="45" />
      <line x1="30" y1="80" x2="50" y2="80" />
      <circle cx="40" cy="5" r="2" fill="#00ff88" />
      <circle cx="15" cy="45" r="1.5" fill="#00ff88" />
      <circle cx="65" cy="45" r="1.5" fill="#00ff88" />
    </g>
  </svg>
)

const GeoArrowDownSVG = ({ size = 80, opacity = 0.12 }: { size?: number; opacity?: number }) => (
  <svg width={size} height={size * 1.5} viewBox="0 0 80 120" fill="none" opacity={opacity}>
    <defs>
      <linearGradient id="arrowDownG" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#ff3b5c" stopOpacity="0.1" />
        <stop offset="100%" stopColor="#ff3b5c" stopOpacity="0.5" />
      </linearGradient>
    </defs>
    <g stroke="#ff3b5c" strokeWidth="0.5">
      <polygon points="40,115 15,75 30,75 30,5 50,5 50,75 65,75" fill="url(#arrowDownG)" />
      <line x1="40" y1="5" x2="40" y2="115" strokeDasharray="2 4" />
      <line x1="15" y1="75" x2="65" y2="75" />
      <line x1="30" y1="40" x2="50" y2="40" />
      <circle cx="40" cy="115" r="2" fill="#ff3b5c" />
      <circle cx="15" cy="75" r="1.5" fill="#ff3b5c" />
      <circle cx="65" cy="75" r="1.5" fill="#ff3b5c" />
    </g>
  </svg>
)

const GeoCandlestickSVG = ({ size = 150, opacity = 0.1 }: { size?: number; opacity?: number }) => (
  <svg width={size} height={size * 0.8} viewBox="0 0 150 120" fill="none" opacity={opacity}>
    <g strokeWidth="0.5">
      <line x1="20" y1="15" x2="20" y2="100" stroke="#00ff88" />
      <rect x="12" y="30" width="16" height="50" stroke="#00ff88" fill="rgba(0,255,136,0.2)" />
      <circle cx="20" cy="15" r="1.5" fill="#00ff88" />
      <line x1="45" y1="25" x2="45" y2="95" stroke="#ff3b5c" />
      <rect x="37" y="35" width="16" height="45" stroke="#ff3b5c" fill="rgba(255,59,92,0.2)" />
      <circle cx="45" cy="25" r="1.5" fill="#ff3b5c" />
      <line x1="70" y1="10" x2="70" y2="85" stroke="#00ff88" />
      <rect x="62" y="20" width="16" height="45" stroke="#00ff88" fill="rgba(0,255,136,0.2)" />
      <circle cx="70" cy="10" r="1.5" fill="#00ff88" />
      <line x1="95" y1="5" x2="95" y2="75" stroke="#00ff88" />
      <rect x="87" y="12" width="16" height="55" stroke="#00ff88" fill="rgba(0,255,136,0.2)" />
      <circle cx="95" cy="5" r="1.5" fill="#00ff88" />
      <line x1="120" y1="30" x2="120" y2="105" stroke="#ff3b5c" />
      <rect x="112" y="40" width="16" height="50" stroke="#ff3b5c" fill="rgba(255,59,92,0.2)" />
      <circle cx="120" cy="30" r="1.5" fill="#ff3b5c" />
      <line x1="20" y1="55" x2="45" y2="57" stroke="#00ff88" strokeDasharray="2 3" opacity="0.5" />
      <line x1="45" y1="57" x2="70" y2="42" stroke="#00ff88" strokeDasharray="2 3" opacity="0.5" />
      <line x1="70" y1="42" x2="95" y2="40" stroke="#00ff88" strokeDasharray="2 3" opacity="0.5" />
      <line x1="95" y1="40" x2="120" y2="65" stroke="#ff3b5c" strokeDasharray="2 3" opacity="0.5" />
    </g>
  </svg>
)

const GeoChartLineSVG = ({ size = 180, opacity = 0.1 }: { size?: number; opacity?: number }) => (
  <svg width={size} height={size * 0.5} viewBox="0 0 180 90" fill="none" opacity={opacity}>
    <defs>
      <linearGradient id="geoChartG" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#00ff88" stopOpacity="0.3" />
        <stop offset="100%" stopColor="#00ff88" stopOpacity="0" />
      </linearGradient>
    </defs>
    <g stroke="#00ff88" strokeWidth="0.5">
      <path d="M0,70 L30,55 L60,60 L90,35 L120,40 L150,20 L180,25 L180,90 L0,90 Z" fill="url(#geoChartG)" />
      <path d="M0,70 L30,55 L60,60 L90,35 L120,40 L150,20 L180,25" strokeWidth="1.5" />
      <line x1="30" y1="0" x2="30" y2="90" strokeDasharray="2 4" opacity="0.3" />
      <line x1="90" y1="0" x2="90" y2="90" strokeDasharray="2 4" opacity="0.3" />
      <line x1="150" y1="0" x2="150" y2="90" strokeDasharray="2 4" opacity="0.3" />
      <line x1="0" y1="45" x2="180" y2="45" strokeDasharray="2 4" opacity="0.3" />
      <circle cx="30" cy="55" r="3" fill="#00ff88" />
      <circle cx="90" cy="35" r="3" fill="#00ff88" />
      <circle cx="150" cy="20" r="4" fill="#00ff88" />
    </g>
  </svg>
)

const GeoPnLSVG = ({ positive = true, size = 120, opacity = 0.12 }: { positive?: boolean; size?: number; opacity?: number }) => {
  const c = positive ? '#00ff88' : '#ff3b5c'
  const v = positive ? '+₹2,45,678' : '-₹87,432'
  return (
    <svg width={size} height={size * 0.5} viewBox="0 0 140 70" fill="none" opacity={opacity}>
      <g stroke={c} strokeWidth="0.5">
        <rect x="2" y="2" width="136" height="66" rx="4" fill={`${c}08`} />
        <line x1="2" y1="25" x2="138" y2="25" strokeDasharray="2 4" opacity="0.5" />
        <polygon points={positive ? "22,45 32,20 42,45" : "22,20 32,45 42,20"} fill={`${c}30`} />
        <circle cx="32" cy={positive ? 20 : 45} r="2" fill={c} />
        <text x="92" y="32" fontFamily="monospace" fontSize="10" fill={c} textAnchor="middle" fontWeight="bold">P&amp;L</text>
        <text x="92" y="52" fontFamily="monospace" fontSize="11" fill={c} textAnchor="middle" fontWeight="bold">{v}</text>
      </g>
    </svg>
  )
}

const GeoDollarSVG = ({ size = 70, opacity = 0.08 }: { size?: number; opacity?: number }) => (
  <svg width={size} height={size} viewBox="0 0 70 70" fill="none" opacity={opacity}>
    <g stroke="#ffd700" strokeWidth="0.5">
      <polygon points="35,5 60,20 60,50 35,65 10,50 10,20" fill="rgba(255,215,0,0.1)" />
      <line x1="35" y1="5" x2="35" y2="65" strokeDasharray="2 3" />
      <line x1="10" y1="35" x2="60" y2="35" strokeDasharray="2 3" />
      <path d="M28,22 Q35,18 42,22 Q48,26 42,32 Q35,35 35,35 Q35,35 28,38 Q22,44 28,50 Q35,54 42,50" strokeWidth="2" fill="none" />
      <line x1="35" y1="15" x2="35" y2="57" strokeWidth="1.5" />
      <circle cx="35" cy="5" r="2" fill="#ffd700" />
      <circle cx="60" cy="35" r="2" fill="#ffd700" />
      <circle cx="35" cy="65" r="2" fill="#ffd700" />
      <circle cx="10" cy="35" r="2" fill="#ffd700" />
    </g>
  </svg>
)

const GeoPercentSVG = ({ positive = true, size = 90, opacity = 0.1 }: { positive?: boolean; size?: number; opacity?: number }) => {
  const c = positive ? '#00ff88' : '#ff3b5c'
  const v = positive ? '+12.5%' : '-8.3%'
  return (
    <svg width={size} height={size * 0.45} viewBox="0 0 100 45" fill="none" opacity={opacity}>
      <g stroke={c} strokeWidth="0.5">
        <polygon points="50,2 98,22 50,42 2,22" fill={`${c}10`} />
        <line x1="50" y1="2" x2="50" y2="42" strokeDasharray="2 3" opacity="0.5" />
        <polygon points={positive ? "20,28 27,15 34,28" : "20,15 27,28 34,15"} fill={`${c}40`} />
        <text x="65" y="26" fontFamily="monospace" fontSize="12" fill={c} textAnchor="middle" fontWeight="bold">{v}</text>
        <circle cx="50" cy="2" r="2" fill={c} />
        <circle cx="98" cy="22" r="2" fill={c} />
        <circle cx="2" cy="22" r="2" fill={c} />
      </g>
    </svg>
  )
}

export const TradingBackground = () => {
  const isDark = useColorModeValue(false, true)
  
  const elements = [
    { Component: GeoArrowUpSVG, props: { size: 70, opacity: 0.1 }, position: { top: '45%', left: '12%' }, custom: 0.6 },
    { Component: GeoArrowUpSVG, props: { size: 50, opacity: 0.08 }, position: { top: '15%', right: '25%' }, custom: 0.4 },
    { Component: GeoArrowDownSVG, props: { size: 60, opacity: 0.09 }, position: { bottom: '40%', right: '15%' }, custom: -0.5 },
    { Component: GeoArrowDownSVG, props: { size: 45, opacity: 0.07 }, position: { top: '60%', left: '25%' }, custom: -0.3 },
    { Component: GeoCandlestickSVG, props: { size: 160, opacity: 0.1 }, position: { top: '8%', left: '25%' }, custom: 0.2 },
    { Component: GeoCandlestickSVG, props: { size: 120, opacity: 0.08 }, position: { bottom: '10%', right: '25%' }, custom: -0.2 },
    { Component: GeoChartLineSVG, props: { size: 200, opacity: 0.1 }, position: { top: '35%', right: '5%' }, custom: -0.3 },
    { Component: GeoChartLineSVG, props: { size: 150, opacity: 0.08 }, position: { bottom: '30%', left: '15%' }, custom: 0.25 },
    { Component: GeoPnLSVG, props: { positive: true, size: 130, opacity: 0.12 }, position: { top: '55%', right: '12%' }, custom: -0.2 },
    { Component: GeoPnLSVG, props: { positive: false, size: 110, opacity: 0.1 }, position: { bottom: '50%', left: '8%' }, custom: 0.2 },
    { Component: GeoDollarSVG, props: { size: 60, opacity: 0.08 }, position: { top: '70%', left: '35%' }, custom: 0.4 },
    { Component: GeoDollarSVG, props: { size: 50, opacity: 0.06 }, position: { top: '25%', right: '40%' }, custom: -0.3 },
    { Component: GeoPercentSVG, props: { positive: true, size: 100, opacity: 0.1 }, position: { top: '12%', left: '50%' }, custom: 0.3 },
    { Component: GeoPercentSVG, props: { positive: false, size: 80, opacity: 0.08 }, position: { bottom: '18%', right: '35%' }, custom: -0.25 },
  ]

  const adjusted = elements.map(el => ({
    ...el,
    props: { ...el.props, opacity: isDark ? el.props.opacity : (el.props.opacity || 0.1) * 0.4 },
  }))

  return (
    <Box position="fixed" inset="0" pointerEvents="none" zIndex={0} overflow="hidden">
      {adjusted.map((el, i) => (
        <MotionBox key={i} position="absolute" {...el.position} variants={floatVariants} custom={el.custom} animate="animate">
          <el.Component {...el.props} />
        </MotionBox>
      ))}
      <Box position="absolute" top="15%" left="5%" w="400px" h="400px" bg="radial-gradient(circle, rgba(0,255,136,0.04) 0%, transparent 70%)" borderRadius="full" filter="blur(60px)" />
      <Box position="absolute" bottom="20%" right="10%" w="350px" h="350px" bg="radial-gradient(circle, rgba(255,59,92,0.03) 0%, transparent 70%)" borderRadius="full" filter="blur(60px)" />
      <Box position="absolute" top="50%" left="40%" w="500px" h="500px" bg="radial-gradient(circle, rgba(0,212,255,0.02) 0%, transparent 70%)" borderRadius="full" filter="blur(80px)" transform="translate(-50%, -50%)" />
    </Box>
  )
}