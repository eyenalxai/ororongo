import { Sample, Track } from '@/lib/types'
import { AudioTest } from '@/components/audio-test'
import { buildTracks, cn } from '@/lib/utils'

export default function Home() {
  const samples: Sample[] = [
    {
      full_name: 'Daughters – Less Sex',
      key: 'less_sex'
    },
    {
      full_name: 'Daft Punk – Contact',
      key: 'contact'
    }
  ]

  const tracks: Track[] = buildTracks(samples)

  return (
    <main className={cn('container', 'mx-auto', 'max-w-2xl', 'mt-12')}>
      <AudioTest tracks={tracks} />
    </main>
  )
}
