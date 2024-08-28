import speech from '@google-cloud/speech'
import { google } from '@google-cloud/speech/build/protos/protos'
import AudioEncoding = google.cloud.speech.v1.RecognitionConfig.AudioEncoding
import Pumpify from 'pumpify'

class STT {
  public static client = new speech.SpeechClient()
  public static stream: Pumpify|null = null

  public static initSTT(
    encoding: AudioEncoding = AudioEncoding.MULAW,
    sampleRateHertz: number = 8000,
    languageCode: string = process.env.LANGUAGE_CODE || 'en-US'
  ) {
    STT.stream = STT.client.streamingRecognize({
      config: {
        encoding,
        sampleRateHertz,
        languageCode
      },
      interimResults: true
    }).on('error', console.error)
      .on('data', (data) => {
        console.debug('onData:', data.results[0].alternatives[0].transcript)
      })
  }

  public static write(payload: string) {
    STT.stream?.write(payload)
  }

  public static close() {
    STT.stream?.destroy()
  }
}

export default STT