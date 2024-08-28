import express from 'express'
import http from 'http'
import cors from 'cors'
import router from './routes'
import dotenv from 'dotenv'
import ngrok from 'ngrok'
import * as twilio from './twilio'
import Websocket from './websocket'
import * as path from 'node:path'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const server = http.createServer(app)

// Create WebSocket Server
new Websocket(server)

//Handle HTTP Request
app.use(express.static(path.join(__dirname, 'public')))
app.use(router)

// Start the server
console.log(`Listening at port ${process.env.PORT || 8080}`)
server.listen(process.env.PORT || 8080)

// Start ngrok and update Twilio Voice URL with the ngrok URL
ngrok.connect(parseInt(process.env.PORT || '8080'))
  .then(url => {
    console.debug('ngrok:', url)

    const client = twilio.init()
    twilio.updateVoiceUrl(client, url)
  })
  .catch(error => console.error('ngrok:', error))
