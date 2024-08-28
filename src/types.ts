
export enum TwilioEvent {
  CONNECTED = 'connected',
  START = 'start',
  MEDIA = 'media',
  STOP = 'stop'
}

export type Message = {
  event: TwilioEvent.CONNECTED
  protocol: string
  version: string
} | {
  event: TwilioEvent.START
  sequenceNumber: string
  streamSid: string
  start: {
    accountSid: string
    streamSid: string
    callSid: string
    tracks: string[]
    mediaFormat: {
      encoding: string
      sampleRate: number
      channels: number
    }
    customParameters: object
  }
} | {
  event: TwilioEvent.MEDIA
  sequenceNumber: string
  streamSid: string
  media: {
    track: string
    chunk: string
    timestamp: string
    payload: string
  }
} | {
  event: TwilioEvent.STOP
  sequenceNumber: string
  streamSid: string
  stop: {
    accountSid: string
    callSid: string
  }
}
