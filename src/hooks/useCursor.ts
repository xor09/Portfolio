import { useState, useEffect, useCallback } from 'react'

interface CursorPosition {
  x: number
  y: number
}

export const useCursor = () => {
  const [position, setPosition] = useState<CursorPosition>({ x: 0, y: 0 })
  const [dotPosition, setDotPosition] = useState<CursorPosition>({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setDotPosition({ x: e.clientX, y: e.clientY })
    
    // Smooth follow for outer cursor
    setTimeout(() => {
      setPosition({ x: e.clientX, y: e.clientY })
    }, 50)
  }, [])

  const handleMouseEnter = useCallback(() => setIsHovering(true), [])
  const handleMouseLeave = useCallback(() => setIsHovering(false), [])

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove)
    
    // Add hover listeners to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, [data-cursor-hover]')
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter)
      el.addEventListener('mouseleave', handleMouseLeave)
    })

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter)
        el.removeEventListener('mouseleave', handleMouseLeave)
      })
    }
  }, [handleMouseMove, handleMouseEnter, handleMouseLeave])

  return { position, dotPosition, isHovering }
}
