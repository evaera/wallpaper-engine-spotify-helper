import { BrowserWindow } from 'electron'
import { EventEmitter } from 'events'
//import * as queryString from 'query-string'
//import { AUTH_URL, CSRF_STATE, REDIRECT_URI } from './constants'
import { AUTH_URL, REDIRECT_URI } from './constants'

// interface AuthResponse {
//   access_token: string;
//   expires_in: number;
//   token_type: string;
//   state: string;
// }

export declare interface Login {
  on(event: 'authorized', cb: (token: string) => any): this
}

export class Login extends EventEmitter {
  private window: BrowserWindow
  private isAuthorized = false

  constructor() {
    super()

    this.window = new BrowserWindow({
      center: true,
      width: 450,
      height: 650,
      //resizable: false,
      resizable: true,
      webPreferences: {
        sandbox: true
      },
      title: 'Sign in to Spotify',
      show: false
    })

    this.window.setMenu(null)
    this.window.webContents.openDevTools();

    const extractFromUrl = ((e: Electron.Event, url: string) => {
      if (url.startsWith(REDIRECT_URI)) {
        e.preventDefault()
        this.window.hide()
        console.log("url: " + REDIRECT_URI);

        //const params: AuthResponse = queryString.parse(url.replace(REDIRECT_URI, ''))
        // var params: AuthResponse = {
        //   access_token: "string",
        //   expires_in: 1234,
        //   token_type: "string",
        //   state: "string",
        // };


        // if (params.state === CSRF_STATE) {
        //   this.isAuthorized = true
        //   this.emit('authorized', params.access_token)
        // }
      }
    }).bind(this)

    this.window.webContents.on('will-redirect', (e, oldUrl, newUrl) => {
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

  authorize() {
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
