'use client'

import { createContext, ReactNode, useState } from 'react'
import { AudioFile } from '@/lib/types'

type PlayingContextType = {
  playingAudioPath: string | null
  stopCurrentAudio: () => void
  startAudio: (audioFile: AudioFile) => void
}

export const PlayingContext = createContext<PlayingContextType | undefined>(
  undefined
)

export const PlayingProvider = ({ children }: { children: ReactNode }) => {
  const [playingAudio, setPlayingAudio] = useState<HTMLAudioElement | null>(
    null
  )
  const [playingAudioPath, setPlayingAudioPath] = useState<string | null>(null)

  const stopCurrentAudio = () => {
    if (playingAudio) {
      playingAudio.pause()
      playingAudio.currentTime = 0
      setPlayingAudio(null)
      setPlayingAudioPath(null)
    }
  }

  const startAudio = (audioFile: AudioFile) => {
    stopCurrentAudio()
    const newAudio = new Audio(audioFile.url)
    newAudio.play().then(() => {
      setPlayingAudio(newAudio)
      setPlayingAudioPath(audioFile.url)
    })
  }

  return (
    <PlayingContext.Provider
      value={{ playingAudioPath, stopCurrentAudio, startAudio }}
    >
      {children}
    </PlayingContext.Provider>
  )
}
