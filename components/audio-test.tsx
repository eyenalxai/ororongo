'use client'

import { AudioFile, Track } from '@/lib/types'
import { useEffect, useState } from 'react'
import { TrackPlayer } from '@/components/track-player'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type AudioTestProps = {
  tracks: Track[]
}

export const AudioTest = ({ tracks }: AudioTestProps) => {
  const allFullNames = tracks.map(track => track.full_name)
  const [selectedFullNames, setSelectedFullNames] = useState<string[]>([])

  const [selectedFlacs, setSelectedFlacs] = useState(0)

  const [isFinished, setIsFinished] = useState(false)

  useEffect(() => {
    if (selectedFullNames.length === allFullNames.length) {
      setIsFinished(true)
    }
  }, [allFullNames.length, selectedFullNames])

  const selectAudio = (audioFile: AudioFile, track: Track) => {
    if (!selectedFullNames.includes(track.full_name)) {
      setSelectedFullNames([...selectedFullNames, track.full_name])
    }
    if (audioFile.quality === 'flac') {
      setSelectedFlacs(selectedFlacs + 1)
      return
    }
    setSelectedFlacs(selectedFlacs > 0 ? selectedFlacs - 1 : 0)
  }

  return (
    <div>
      <div>
        {tracks.map(track => {
          return (
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
                      <TrackPlayer audioFile={file} />
                      <Button
                        variant={'outline'}
                        disabled={isFinished}
                        onClick={() => selectAudio(file, track)}
                      >
                        Select
                      </Button>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
      {isFinished && (
        <div>
          You guessed correctly {selectedFlacs} out of {allFullNames.length}
        </div>
      )}
    </div>
  )
}
