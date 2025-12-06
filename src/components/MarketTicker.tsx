import { Box, Flex, Text, useColorMode } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { useMarketTicker } from '../hooks/useLiveChart'

export const MarketTicker = () => {
  const tickers = useMarketTicker()
  const { colorMode } = useColorMode()

  const duplicatedTickers = [...tickers, ...tickers]

  return (
    <Box
      position="fixed"
      top="0"
      left="0"
      right="0"
      zIndex="100"
      bg={colorMode === 'dark' ? 'rgba(10, 10, 15, 0.9)' : 'rgba(245, 247, 250, 0.9)'}
      backdropFilter="blur(10px)"
      borderBottom="1px solid"
      borderColor={colorMode === 'dark' ? 'rgba(0, 255, 136, 0.1)' : 'rgba(0, 100, 80, 0.1)'}
      overflow="hidden"
      py={2}
    >
      <motion.div
        className="ticker-animate"
        style={{
          display: 'flex',
          width: 'fit-content',
        }}
      >
        {duplicatedTickers.map((ticker, index) => (
          <Flex
            key={`${ticker.symbol}-${index}`}
            align="center"
            gap={2}
            px={6}
            borderRight="1px solid"
            borderColor={colorMode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}
          >
            <Text
              fontFamily="mono"
              fontSize="xs"
              fontWeight="600"
              color={colorMode === 'dark' ? 'gray.400' : 'gray.600'}
            >
              {ticker.symbol}
            </Text>
            <Text
              fontFamily="mono"
              fontSize="xs"
              fontWeight="700"
              color={colorMode === 'dark' ? 'white' : 'gray.800'}
            >
              {ticker.value.toLocaleString()}
            </Text>
            <Text
              fontFamily="mono"
              fontSize="xs"
              fontWeight="600"
              color={ticker.change >= 0 ? 'brand.green' : 'brand.red'}
            >
              {ticker.change >= 0 ? '▲' : '▼'} {Math.abs(ticker.change).toFixed(2)}%
            </Text>
          </Flex>
        ))}
      </motion.div>
    </Box>
  )
}
