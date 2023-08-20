import { PlayingContext } from '@/components/playing-context'
import { useContext } from 'react'

export const usePlaying = () => {
  const context = useContext(PlayingContext)
  if (!context) {
    throw new Error(`usePlaying must be used within a PlayingProvider`)
  }
  return context
}
