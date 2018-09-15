declare module 'electron-wallpaper' {
  import { BrowserWindow } from 'electron'

  class ElectronWallpaper {
    static attachWindow (window: BrowserWindow): void
  }

  namespace ElectronWallpaper {

  }

  export = ElectronWallpaper
}
