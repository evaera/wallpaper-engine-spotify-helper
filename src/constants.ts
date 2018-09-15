export const PORT = 47621
export const CSRF_STATE = Math.random().toString(36).substring(2)
export const REDIRECT_URI = 'http://localhost:47621/'
export const CLIENT_ID = '691f383bed2f48888fc3f6971051a2ac'
export const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&state=${CSRF_STATE}&scope=user-read-currently-playing&redirect_uri=http://localhost:${PORT}`
export const CURRENT_PLAYING_URL = 'https://api.spotify.com/v1/me/player/currently-playing'
