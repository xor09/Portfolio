import { useState, useEffect, useCallback } from 'react'

interface DataPoint {
  value: number
  timestamp: number
}

export const useLiveChart = (
  initialValue: number = 100,
  volatility: number = 2,
  updateInterval: number = 100
) => {
  const [data, setData] = useState<DataPoint[]>(() => {
    const initial: DataPoint[] = []
    let value = initialValue
    for (let i = 0; i < 50; i++) {
      value += (Math.random() - 0.5) * volatility
      initial.push({ value, timestamp: Date.now() - (50 - i) * updateInterval })
    }
    return initial
  })

  const [currentValue, setCurrentValue] = useState(initialValue)
  const [trend, setTrend] = useState<'up' | 'down' | 'neutral'>('neutral')

  const generateNewPoint = useCallback(() => {
    setData(prev => {
      const lastValue = prev[prev.length - 1]?.value || initialValue
      const change = (Math.random() - 0.48) * volatility // Slight bullish bias
      const newValue = Math.max(0, lastValue + change)
      
      setCurrentValue(newValue)
      setTrend(change > 0.5 ? 'up' : change < -0.5 ? 'down' : 'neutral')
      
      const newData = [...prev.slice(-49), { value: newValue, timestamp: Date.now() }]
      return newData
    })
  }, [initialValue, volatility])

  useEffect(() => {
    const interval = setInterval(generateNewPoint, updateInterval)
    return () => clearInterval(interval)
  }, [generateNewPoint, updateInterval])

  return { data, currentValue, trend }
}

export const useMarketTicker = () => {
  const [tickers, setTickers] = useState([
    { symbol: 'NIFTY 50', value: 24850.75, change: 1.24 },
    { symbol: 'BANKNIFTY', value: 52340.20, change: -0.45 },
    { symbol: 'SENSEX', value: 81250.50, change: 0.89 },
    { symbol: 'FINNIFTY', value: 23150.30, change: 0.67 },
    { symbol: 'USDINR', value: 84.25, change: -0.12 },
    { symbol: 'GOLD', value: 72450.00, change: 0.34 },
    { symbol: 'CRUDE', value: 6780.50, change: -1.23 },
    { symbol: 'REACT', value: 18.20, change: 2.50 },
    { symbol: 'NODE', value: 21.40, change: 1.80 },
    { symbol: 'PGSQL', value: 156.75, change: 0.95 },
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      setTickers(prev => prev.map(ticker => {
        const changeAmount = (Math.random() - 0.5) * 0.1
        const newChange = +(ticker.change + changeAmount).toFixed(2)
        const valueChange = ticker.value * (changeAmount / 100)
        return {
          ...ticker,
          value: +(ticker.value + valueChange).toFixed(2),
          change: Math.max(-5, Math.min(5, newChange)),
        }
      }))
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return tickers
}
