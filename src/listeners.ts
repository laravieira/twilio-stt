import WebSocket from 'ws'
import { Message, TwilioEvent } from './types'

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
        console.debug('onCallConnected:', message.protocol, message.version);
        break;
      case TwilioEvent.START:
        console.debug('onCallStart:', message.streamSid);
        break;
      case TwilioEvent.MEDIA:
        console.debug('onMedia:', message.streamSid);
        break;
      case TwilioEvent.STOP:
        console.debug('onStop:', message.streamSid);
        break;
      default:
        console.error(`onUnknown: ${message}`);
    }
  }catch (error) {
    console.error('onMessage:', error)
  }
}

function onClose() {
  console.debug('onClose.')
}