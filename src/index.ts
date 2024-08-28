import WebSocket from 'ws'
import express from 'express'
import http from 'http'
import cors from 'cors'
import { onConnection } from './ws/listeners'
import router from './http/routes'

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

console.log('Listening at Port 8080')
server.listen(8080)