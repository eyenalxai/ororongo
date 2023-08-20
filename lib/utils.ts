import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { AudioFile, Quality, Sample, Track } from '@/lib/types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const shuffleAudioFiles = (array: AudioFile[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

const buildPath = (baseUrl: string, key: string, quality: Quality) => {
  if (quality === 'lossless') return `${baseUrl}/${key}/${key}.flac`
  if (quality === '320') return `${baseUrl}/${key}/${key}_320.mp3`
  if (quality === '128') return `${baseUrl}/${key}/${key}_128.mp3`
  if (quality === '64') return `${baseUrl}/${key}/${key}_64.mp3`
  throw new Error(`Invalid quality: ${quality}`)
}

export const buildTracks = (samples: Sample[]): Track[] => {
  const baseUrl = `https://sitemap-storage.ams3.cdn.digitaloceanspaces.com/audio`
  const qualities: Quality[] = ['lossless', '320', '128', '64']

  return samples.map(sample => {
    const files = qualities.map(quality => {
      const path = buildPath(baseUrl, sample.key, quality)
      return { path, quality }
    })
    return { full_name: sample.full_name, files: shuffleAudioFiles(files) }
  })
}

export const buildAudioUrls = (files: AudioFile[]) => {}
