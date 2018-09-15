# Wallpaper Engine Spotify Helper

A helper application that forwards your Spotify listening status to Wallpaper Engine wallpapers (or anything, really) so that you can display the currently playing track.

I made this for myself, I don't expect anyone else to use it, but if you want it, here it is.

[**Click here to download the installer.**](https://github.com/evaera/wallpaper-engine-spotify-helper/releases/latest)

## Wallpaper/Client API

From the client, connect via a socket.io client to `http://localhost:47621` and listen to the `song` event. It'll be sent every 5 seconds.

```js

const socket = io('http://localhost:47621')
socket.on('song', track => {
  console.log(track)
})
```

Track is a [Currently Playing Object](https://developer.spotify.com/documentation/web-api/reference/player/get-the-users-currently-playing-track/#currently-playing-object)

Make sure you add this snippet to your HEAD tag to have access to `io`:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.1.1/socket.io.js"></script>
```

After running the helper, a sample display will be available at `http://localhost:47621/overlay`. If you wanted to, you could just add this to any wallpaper by modifying the source and adding an iframe:

```html
<iframe src="http://localhost:47621/overlay" style="border: none; position: absolute; left: 0; right: 0; top: 0; bottom: 0; width: 100%; height: 100%; z-index: -10"></iframe>
```
