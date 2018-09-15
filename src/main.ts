import { app } from 'electron'
import * as express from 'express'
import * as http from 'http'
import * as path from 'path'
import * as socketIO from 'socket.io'
import { PORT } from './constants'
import Login from './login'
import SpotifyStatus from './SpotifyStatus'

const server = express()
const httpServer = new http.Server(server)
const io = socketIO(httpServer)

server.get('/overlay', (req: express.Request, res: express.Response) => {
  res.sendFile(path.join(__dirname, '..', 'html', 'window.html'))
})

io.on('connection', socket => {
  console.log('Client connected.')
})

httpServer.listen(PORT)

app.on('ready', () => {
  const login = new Login()

  login.on('authorized', (token) => {
    const status = new SpotifyStatus(token)

    const i = setInterval(() => {
      status.getCurrentTrack().then(track => {
        io.emit('song', track)
      }).catch(e => {
        console.log('Session expired, renewing...')
        clearInterval(i)
        login.authorize()
      })
    }, 5000)
  })
})
