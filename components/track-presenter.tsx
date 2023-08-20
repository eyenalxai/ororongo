import { AudioFile, Quality, Track } from '@/lib/types'
import { Fragment } from 'react'
import { cn } from '@/lib/utils'
import { PlayAndSelect } from '@/components/play-and-select'
import { Separator } from '@/components/ui/separator'

type TrackPresenterProps = {
  track: Track
  idx: number
  tracks: Track[]
  isFinished: boolean
  selectedQualities: { [fullName: string]: Quality }
  selectAudio: (audioFile: AudioFile, track: Track) => void
}

export const TrackPresenter = ({
  track,
  idx,
  tracks,
  isFinished,
  selectedQualities,
  selectAudio
}: TrackPresenterProps) => {
  return (
    <Fragment key={track.full_name}>
      <div key={track.full_name}>
        <h2 className={cn('text-lg', 'mb-4')}>{track.full_name}</h2>
        <div
          className={cn(
            'flex',
            'flex-col',
            'items-start',
            'justify-center',
            'gap-2'
          )}
        >
          {track.files.map(audioFile => {
            return (
              <PlayAndSelect
                key={audioFile.quality}
                audioFile={audioFile}
                track={track}
                isFinished={isFinished}
                selectedQualities={selectedQualities}
                selectAudio={selectAudio}
              />
            )
          })}
        </div>
      </div>
      {idx !== tracks.length - 1 && <Separator className={cn('my-4')} />}
    </Fragment>
  )
}
