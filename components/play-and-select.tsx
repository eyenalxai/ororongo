import { AudioFile, Quality, Track } from '@/lib/types'
import { cn } from '@/lib/utils'
import { TrackPlayer } from '@/components/track-player'
import { Button } from '@/components/ui/button'

type PlayAndSelectProps = {
  audioFile: AudioFile
  track: Track
  isFinished: boolean
  selectedQualities: { [fullName: string]: Quality }
  selectAudio: (audioFile: AudioFile, track: Track) => void
}

export const PlayAndSelect = ({
  audioFile,
  track,
  isFinished,
  selectedQualities,
  selectAudio
}: PlayAndSelectProps) => {
  return (
    <div
      key={audioFile.quality}
      className={cn(
        'flex',
        'flex-row',
        'justify-center',
        'items-center',
        'gap-4'
      )}
    >
      <TrackPlayer audioFile={audioFile} disabled={isFinished} />
      <Button
        variant={
          selectedQualities[track.full_name] === audioFile.quality
            ? 'default'
            : 'ghost'
        }
        disabled={isFinished}
        onClick={() => selectAudio(audioFile, track)}
      >
        SELECT
      </Button>
      {isFinished && (
        <div className={cn('mr-4')}>{audioFile.quality.toUpperCase()}</div>
      )}
    </div>
  )
}
