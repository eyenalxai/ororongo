'use client'

import { AudioFile, Quality, Track } from '@/lib/types'
import { useMemo, useState } from 'react'
import { TrackPlayer } from '@/components/track-player'
import { Button } from '@/components/ui/button'
import { cn, shuffleAudioFiles } from '@/lib/utils'
import { Separator } from '@/components/ui/separator'

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
      <div>
        {shuffledTracks.map((track, idx) => {
          return (
            <>
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
                  {track.files.map(file => {
                    return (
                      <div
                        key={file.path}
                        className={cn(
                          'flex',
                          'flex-row',
                          'justify-center',
                          'items-center',
                          'gap-4'
                        )}
                      >
                        <TrackPlayer audioFile={file} disabled={isFinished} />
                        <Button
                          variant={
                            selectedQualities[track.full_name] === file.quality
                              ? 'default'
                              : 'ghost'
                          }
                          disabled={isFinished}
                          onClick={() => selectAudio(file, track)}
                        >
                          SELECT
                        </Button>
                        {isFinished && (
                          <div className={cn('mr-4')}>
                            {file.quality.toUpperCase()}
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
              {
                // If not last track, add a Separator
                idx !== tracks.length - 1 && (
                  <Separator className={cn('my-4')} />
                )
              }
            </>
          )
        })}
      </div>
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
