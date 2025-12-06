import { Box, useColorMode } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { useLiveChart } from '../hooks/useLiveChart'
import { useMemo } from 'react'

interface LiveChartProps {
  width?: number
  height?: number
  strokeColor?: string
  volatility?: number
}

export const LiveChart = ({ 
  width = 300, 
  height = 100, 
  strokeColor = '#00ff88',
  volatility = 3
}: LiveChartProps) => {
  const { data, trend } = useLiveChart(100, volatility, 150)
  const { colorMode } = useColorMode()

  const { path, areaPath } = useMemo(() => {
    if (data.length < 2) return { path: '', areaPath: '', minVal: 0, maxVal: 100 }

    const values = data.map(d => d.value)
    const min = Math.min(...values)
    const max = Math.max(...values)
    const range = max - min || 1

    const points = data.map((d, i) => {
      const x = (i / (data.length - 1)) * width
      const y = height - ((d.value - min) / range) * height * 0.8 - height * 0.1
      return { x, y }
    })

    // Create smooth curve using quadratic bezier
    let pathD = `M ${points[0].x} ${points[0].y}`
    for (let i = 1; i < points.length; i++) {
      const prev = points[i - 1]
      const curr = points[i]
      const cpx = (prev.x + curr.x) / 2
      pathD += ` Q ${prev.x} ${prev.y} ${cpx} ${(prev.y + curr.y) / 2}`
    }
    pathD += ` L ${points[points.length - 1].x} ${points[points.length - 1].y}`

    // Area path
    const areaD = pathD + ` L ${width} ${height} L 0 ${height} Z`

    return { path: pathD, areaPath: areaD, minVal: min, maxVal: max }
  }, [data, width, height])

  const color = trend === 'up' ? '#00ff88' : trend === 'down' ? '#ff3b5c' : strokeColor

  return (
    <Box position="relative" overflow="hidden">
      <svg width={width} height={height} style={{ overflow: 'visible' }}>
        <defs>
          <linearGradient id={`chartGradient-${strokeColor}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity="0.3" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Grid lines */}
        {[...Array(5)].map((_, i) => (
          <line
            key={i}
            x1="0"
            y1={height * (i / 4)}
            x2={width}
            y2={height * (i / 4)}
            stroke={colorMode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}
            strokeDasharray="4 4"
          />
        ))}

        {/* Area fill */}
        <motion.path
          d={areaPath}
          fill={`url(#chartGradient-${strokeColor})`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        />

        {/* Main line */}
        <motion.path
          d={path}
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          filter="url(#glow)"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        />

        {/* Current value dot */}
        {data.length > 0 && (
          <motion.circle
            cx={width}
            cy={height - ((data[data.length - 1].value - (Math.min(...data.map(d => d.value)))) / 
              ((Math.max(...data.map(d => d.value))) - (Math.min(...data.map(d => d.value))) || 1)) * height * 0.8 - height * 0.1}
            r="4"
            fill={color}
            filter="url(#glow)"
            animate={{
              r: [4, 6, 4],
              opacity: [1, 0.7, 1],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        )}
      </svg>
    </Box>
  )
}
