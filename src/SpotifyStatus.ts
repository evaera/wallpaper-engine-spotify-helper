import axios from 'axios'
import { CURRENT_PLAYING_URL } from './constants'

interface SpotifyExternalUrls {
  spotify: string
}

interface SpotifyItem {
  href: string
  id: string
  name: string
  uri: string
  type: string
}

interface SpotifyArtist extends SpotifyItem {
  external_urls: SpotifyExternalUrls
}

interface SpotifyAlbumImage {
  height: number
  width: number
  url: string
}

interface SpotifyAlbum extends SpotifyItem {
  album_type: string
  artists: SpotifyArtist[]
  external_urls: SpotifyExternalUrls
  images: SpotifyAlbumImage[]
  release_date: string
  release_date_precision: string
  total_tracks: number
}

interface SpotifyTrack extends SpotifyItem {
  album: SpotifyAlbum
  artists: SpotifyArtist[]
  disc_number: 1
  duration_ms: number
  explicit: boolean
  external_ids: {
    isrc: string
  }
  external_urls: SpotifyExternalUrls
  is_local: boolean
  popularity: 48
  preview_url: string
  track_number: number
}

interface SpotifyCurrentStatus {
  timestamp: number
  progress_ms: 8061
  item: SpotifyTrack
  is_playing: boolean
  currently_playing_type: string
}

export default class SpotifyStatus {
  constructor (private accessToken: string) {

  }

  async getCurrentTrack (): Promise<SpotifyCurrentStatus> {
    const response = await axios.get(CURRENT_PLAYING_URL, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`
      }
    })

    return response.data as SpotifyCurrentStatus
  }
}
