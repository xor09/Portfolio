import { extendTheme, type ThemeConfig } from '@chakra-ui/react'

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}

export const theme = extendTheme({
  config,
  fonts: {
    heading: "'Outfit', sans-serif",
    body: "'Outfit', sans-serif",
    mono: "'JetBrains Mono', monospace",
  },
  colors: {
    brand: {
      green: '#00ff88',
      greenDark: '#00cc6a',
      red: '#ff3b5c',
      redDark: '#cc2f4a',
      cyan: '#00d4ff',
      cyanDark: '#00a8cc',
      gold: '#ffd700',
      dark: '#0a0a0f',
      darkCard: '#12121a',
      darkBorder: '#1e1e2e',
    },
    trading: {
      bull: '#00ff88',
      bear: '#ff3b5c',
      neutral: '#808080',
    }
  },
  styles: {
    global: (props: { colorMode: string }) => ({
      body: {
        bg: props.colorMode === 'dark' ? 'brand.dark' : '#f5f7fa',
        color: props.colorMode === 'dark' ? '#e0e0e0' : '#1a1a2e',
      },
    }),
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: '600',
        borderRadius: 'lg',
        fontFamily: "'Outfit', sans-serif",
      },
      variants: {
        trading: () => ({
          bg: 'transparent',
          border: '2px solid',
          borderColor: 'brand.green',
          color: 'brand.green',
          _hover: {
            bg: 'rgba(0, 255, 136, 0.1)',
            boxShadow: '0 0 20px rgba(0, 255, 136, 0.3)',
            transform: 'translateY(-2px)',
          },
          _active: {
            transform: 'translateY(0)',
          },
          transition: 'all 0.3s ease',
        }),
        tradingFilled: {
          bg: 'brand.green',
          color: 'brand.dark',
          _hover: {
            bg: 'brand.greenDark',
            boxShadow: '0 0 30px rgba(0, 255, 136, 0.4)',
            transform: 'translateY(-2px)',
          },
        },
        bearish: {
          bg: 'transparent',
          border: '2px solid',
          borderColor: 'brand.red',
          color: 'brand.red',
          _hover: {
            bg: 'rgba(255, 59, 92, 0.1)',
            boxShadow: '0 0 20px rgba(255, 59, 92, 0.3)',
          },
        },
      },
    },
    Card: {
      baseStyle: (props: { colorMode: string }) => ({
        container: {
          bg: props.colorMode === 'dark' ? 'rgba(18, 18, 26, 0.7)' : 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(20px)',
          border: '1px solid',
          borderColor: props.colorMode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.08)',
          borderRadius: 'xl',
        },
      }),
    },
  },
})
