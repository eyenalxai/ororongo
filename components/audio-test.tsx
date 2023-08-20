'use client'

import { AudioFile, Quality, Track } from '@/lib/types'
import { useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'
import { cn, shuffleAudioFiles } from '@/lib/utils'
import { TrackPresenter } from '@/components/track-presenter'

type AudioTestProps = {
  tracks: Track[]
}

export const AudioTest = ({ tracks }: AudioTestProps) => {
  const allFullNames = tracks.map(track => track.full_name)
  const [selectedQualities, setSelectedQualities] = useState<{
    [fullName: string]: Quality
  }>({})

  const [isFinished, setIsFinished] = useState(false)

  const selectAudio = (audioFile: AudioFile, track: Track) => {
    setSelectedQualities({
      ...selectedQualities,
      [track.full_name]: audioFile.quality
    })
  }

  const shuffledTracks = useMemo(
    () =>
      tracks.map(track => {
        return {
          ...track,
          files: shuffleAudioFiles(track.files)
        }
      }),
    [tracks]
  )

  const selectedFlacs = Object.values(selectedQualities).filter(
    quality => quality === 'lossless'
  ).length

  return (
    <div>
      {shuffledTracks.map((track, idx) => {
        return (
          <TrackPresenter
            key={track.full_name}
            track={track}
            idx={idx}
            tracks={tracks}
            isFinished={isFinished}
            selectedQualities={selectedQualities}
            selectAudio={selectAudio}
          />
        )
      })}
      <Button
        className={cn('mt-8')}
        disabled={
          Object.keys(selectedQualities).length !== allFullNames.length ||
          isFinished
        }
        onClick={() => setIsFinished(true)}
      >
        FINISH
      </Button>
      {isFinished && (
        <div className={cn('mt-12')}>
          You guessed correctly
          <span className={cn('font-bold', 'mx-2')}>{selectedFlacs}</span>
          out of
          <span className={cn('font-bold', 'mx-2')}>{allFullNames.length}</span>
        </div>
      )}
    </div>
  )
}
