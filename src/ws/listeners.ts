import WebSocket from 'ws'

export function onConnection(ws: WebSocket.Server) {
  console.debug('onConnection.')
  ws.on('close', onClose)
  ws.on('message', onMessage)
}

function onMessage(data: string) {
  try {
    const message = JSON.parse(data)
    console.debug('onMessage:', message)
  }catch (error) {
    console.error('onMessage:', error)
  }
}

function onClose() {
  console.debug('onClose.')
}