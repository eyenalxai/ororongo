import { AudioFile } from '@/lib/types'
import { usePlaying } from '@/lib/use-playing'
import { Button } from '@/components/ui/button'

type TrackPlayerProps = {
  audioFile: AudioFile
}

export const TrackPlayer = ({ audioFile }: TrackPlayerProps) => {
  const { playingAudioPath, startAudio, stopCurrentAudio } = usePlaying()
  const isPlaying = playingAudioPath === audioFile.path

  const togglePlay = () => {
    if (isPlaying) {
      stopCurrentAudio()
      return
    }
    startAudio(audioFile)
  }

  return (
    <Button variant={'outline'} onClick={() => togglePlay()}>
      {isPlaying ? 'STOP' : 'PLAY'}
    </Button>
  )
}
