import WebSocket from 'ws'
import express from 'express'
import http from 'http'
import cors from 'cors'
import { onConnection } from './listeners'
import router from './routes'
import dotenv from 'dotenv'
import ngrok from 'ngrok'
import * as twilio from './twilio'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const server = http.createServer(app)
const wss = new WebSocket.Server({ server })

// Handle Web Socket Connection
wss.on('connection', onConnection)

//Handle HTTP Request
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
