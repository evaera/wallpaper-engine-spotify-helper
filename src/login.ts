import { BrowserWindow } from 'electron'
import { EventEmitter } from 'events'
import * as queryString from 'query-string'
import { AUTH_URL, CSRF_STATE, REDIRECT_URI } from './constants'

interface AuthResponse {
  access_token: string
  expires_in: number
  state: string
  token_type: string
}

export declare interface Login {
  on (event: 'authorized', cb: (token: string) => any): this
}

export class Login extends EventEmitter {
  private window: BrowserWindow
  private isAuthorized = false

  constructor () {
    super()

    this.window = new BrowserWindow({
      center: true,
      width: 450,
      height: 650,
      resizable: false,
      webPreferences: {
        sandbox: true
      },
      title: 'Sign in to Spotify',
      show: false
    })

    this.window.setMenu(null)

    const extractFromUrl = ((e: Electron.Event, url: string) => {
      if (url.startsWith(REDIRECT_URI)) {
        e.preventDefault()
        this.window.hide()

        const params: AuthResponse = queryString.parse(url.replace(REDIRECT_URI, ''))

        if (params.state === CSRF_STATE) {
          this.isAuthorized = true
          this.emit('authorized', params.access_token)
        }
      }
    }).bind(this)

    this.window.webContents.on('did-get-redirect-request', (e, oldUrl, newUrl) => {
      extractFromUrl(e, newUrl)
    })

    this.window.webContents.on('did-navigate', extractFromUrl)

    this.window.loadURL(AUTH_URL)

    this.window.once('ready-to-show', () => {
      if (!this.isAuthorized) {
        this.window.show()
      }
    })
  }

  authorize () {
    this.isAuthorized = false
    this.window.loadURL(AUTH_URL)
    setTimeout(() => {
      if (this.isAuthorized === false) {
        console.log("Showing window because authorization didn't automatically renew...")
        this.window.show()
      }
    }, 10000)
  }
}

export default Login
