import { Box, useColorMode } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { CustomCursor } from './components/CustomCursor'
import { MarketTicker } from './components/MarketTicker'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { About } from './components/About'
import { Experience } from './components/Experience'
import { Projects } from './components/Projects'
import { Skills } from './components/Skills'
import { Achievements } from './components/Achievements'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { Spotlight } from './components/Spotlight'
import { TradingBackground } from './components/TradingBackground'
import { IdleScreensaver } from './components/IdleScreensaver'
import { BottomDock } from './components/BottomDock'
import { MetricsPopup } from './components/MatrixPopup'
import { TerminalPopup } from './components/TerminalPopup'
import { dockElements } from './constants'
import { CodeSandboxFullscreen } from './components/CodeSandboxFullscreen'

function App() {
  const { colorMode } = useColorMode()
  const [boostEnabled, setBoostEnabled] = useState(false)

  const handleBoostToggle = () => {
    const next = !boostEnabled
    setBoostEnabled(next)

    // Notify BottomDock (or any listener) about boost mode change
    window.dispatchEvent(
      new CustomEvent('bottom-dock-boost', {
        detail: { enabled: next },
      })
    )
  }
  
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', colorMode)
  }, [colorMode])


  // Handle Global keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd/Ctrl + K to open spotlight
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        window.dispatchEvent(new CustomEvent('shortcut-ctrl+k', {
          detail : {
            active : dockElements.SPOTLIGHT
          }
        }))
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <Box position="relative" minH="100vh">
      {/* Background Elements */}
      <Box className="grid-bg" />
      <Box className="noise-overlay" />
      <TradingBackground />

      {/* Idle Screensaver */}
      <IdleScreensaver />

      {/* Bottom Dock */}
      {
        boostEnabled ? <BottomDock /> : null
      }


      {/* Custom Cursor */}
      <CustomCursor />

      {/* Popup Metrics Panel */}
      <MetricsPopup />
      
      {/* Spotlight */}
      <Spotlight 
        boostEnabled={boostEnabled}
      />

      <TerminalPopup />

      <CodeSandboxFullscreen />x

      {/* Market Ticker */}
      <MarketTicker />

      {/* Navigation */}
      <Navbar 
        boostEnabled={boostEnabled}
        handleBoostToggle={handleBoostToggle}
      />

      {/* Main Content */}
      <Box as="main" position="relative" zIndex={1}>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Achievements />
        <Contact />
      </Box>

      {/* Footer */}
      <Footer />
    </Box>
  )
}

export default App
