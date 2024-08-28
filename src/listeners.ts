import WebSocket from 'ws'
import { Message, TwilioEvent } from './types'
import STT from './google'
import { google } from '@google-cloud/speech/build/protos/protos'
import AudioEncoding = google.cloud.speech.v1.RecognitionConfig.AudioEncoding

export function onConnection(ws: WebSocket.Server) {
  console.debug('onConnection.')
  ws.on('close', onClose)
  ws.on('message', onMessage)
}

function onMessage(data: string) {
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

function onClose() {
  console.debug('onClose.')
}