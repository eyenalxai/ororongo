import { Sample, Track } from '@/lib/types'
import { AudioTest } from '@/components/audio-test'
import { cn } from '@/lib/utils'

export default function Home() {
  const samples: Sample[] = [
    {
      full_name: 'Daughters – Less Sex',
      key: 'less_sex'
    },
    {
      full_name: 'Heilung – Elivagar',
      key: 'elivagar'
    }
  ]

  const tracks: Track[] = samples.map(track => {
    return {
      full_name: track.full_name,
      files: [
        { path: `/audio/${track.key}/${track.key}.flac`, quality: 'lossless' },
        { path: `/audio/${track.key}/${track.key}_320.mp3`, quality: '320' },
        { path: `/audio/${track.key}/${track.key}_128.mp3`, quality: '128' },
        { path: `/audio/${track.key}/${track.key}_64.mp3`, quality: '64' }
      ]
    }
  })

  return (
    <main className={cn('container', 'mx-auto', 'max-w-2xl', 'mt-12')}>
      <AudioTest tracks={tracks} />
    </main>
  )
}
