import { Server, OPEN } from 'ws'
import { Message, TwilioEvent } from './types'
import STT from './google'
import { google } from '@google-cloud/speech/build/protos/protos'
import http from 'http'
import AudioEncoding = google.cloud.speech.v1.RecognitionConfig.AudioEncoding

class WebSocket {
  public static ws: Server|null = null

  constructor(server: http.Server) {
    WebSocket.ws = new Server({ server })
    WebSocket.ws.on('connection', this.onConnection.bind(this))
  }

  onConnection(ws: Server) {
    console.debug('onConnection.')

    ws.on('close', this.onClose.bind(this))
    ws.on('message', this.onMessage.bind(this))
  }

  onMessage(data: string) {
    try {
      const message = JSON.parse(data) as Message

      switch (message.event) {
        case TwilioEvent.CONNECTED:
          console.debug('onCallConnected:', message.protocol, message.version)
          break
        case TwilioEvent.START:
          console.debug('onCallStart:', message.streamSid)
          STT.initSTT(AudioEncoding.MULAW, message.start.mediaFormat.sampleRate)
          break;
        case TwilioEvent.MEDIA:
          STT.write(message.media.payload)
          break
        case TwilioEvent.STOP:
          console.debug('onStop:', message.streamSid)
          STT.close()
          break
        default:
          console.error(`onUnknown: ${message}`)
      }
    }catch (error) {
      console.error('onMessage:', error)
      STT.close()
    }
  }

  onClose() {
    console.debug('onClose.')
  }

  public static send(event: string, data: any) {
    this.ws?.clients.forEach(function each(client) {
      if (client.readyState !== OPEN) return

      client.send(JSON.stringify({ event, data }))
    });
  }
}

export default WebSocket