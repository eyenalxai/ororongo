import { AudioFile } from '@/lib/types'
import { usePlaying } from '@/lib/use-playing'
import { Button } from '@/components/ui/button'
import { useEffect } from 'react'

type TrackPlayerProps = {
  audioFile: AudioFile
  disabled: boolean
}

export const TrackPlayer = ({ audioFile, disabled }: TrackPlayerProps) => {
  const { playingAudioPath, startAudio, stopCurrentAudio } = usePlaying()
  const isPlaying = playingAudioPath === audioFile.url

  // if disabled, stop audio
  useEffect(() => {
    if (disabled) {
      stopCurrentAudio()
    }
  }, [disabled, stopCurrentAudio])

  const togglePlay = () => {
    if (isPlaying) {
      stopCurrentAudio()
      return
    }
    startAudio(audioFile)
  }

  return (
    <Button
      disabled={disabled}
      variant={'outline'}
      onClick={() => togglePlay()}
    >
      {isPlaying ? 'STOP' : 'PLAY'}
    </Button>
  )
}
