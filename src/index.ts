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

// Check if all required environment variables are set
if(process.env.ENVIRONMENT !== 'development') {
  if(!process.env.HOST)
    throw new Error('HOST is not set')
  if(!process.env.PHONE_NUMBER)
    throw new Error('PHONE_NUMBER is not set')
}

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const server = http.createServer(app)

// Create WebSocket Server
new Websocket(server)

//Handle HTTP Request
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'templates'))
app.use(router)

// Start the server
console.log(`Listening at port ${process.env.PORT || 8080}`)
server.listen(process.env.PORT || 8080)

// Start ngrok and update Twilio Voice URL with the ngrok URL
if(process.env.ENVIRONMENT !== 'development') {
  const client = twilio.init()
  twilio.updateVoiceUrl(client, process.env.HOST || '')
} else {
  ngrok.connect(parseInt(process.env.PORT || '8080'))
    .then(url => {
      console.debug('ngrok:', url)

      const client = twilio.init()
      twilio.updateVoiceUrl(client, url)
    })
    .catch(error => console.error('ngrok:', error))
}