export type Sample = {
  full_name: string
  key: string
}

export type Quality = 'lossless' | '320' | '128' | '64'

export type AudioFile = {
  url: string
  quality: Quality
}

export type Track = {
  full_name: string
  files: AudioFile[]
}
