import { Box } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { useCursor } from '../hooks/useCursor'

export const CustomCursor = () => {
  const { position, dotPosition, isHovering } = useCursor()

  return (
    <>
      <Box
        as={motion.div}
        className={`custom-cursor ${isHovering ? 'cursor-hover' : ''}`}
        style={{
          left: position.x - 10,
          top: position.y - 10,
        }}
        display={{ base: 'none', md: 'block' }}
      />
      <Box
        as={motion.div}
        className="custom-cursor-dot"
        style={{
          left: dotPosition.x - 3,
          top: dotPosition.y - 3,
        }}
        display={{ base: 'none', md: 'block' }}
      />
    </>
  )
}
