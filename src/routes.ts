import { Router } from 'express'

const router = Router();

router.get('/', (req, res) => res.json({
  app: 'Twilio STT',
  description: 'A simple API to convert speech to text using Twilio Calls and Google Speech to Text',
  version: '0.0.1',
  date: new Date()
}))

router.post("/", (req, res) => {
  res.set("Content-Type", "text/xml");

  res.send(`
    <Response>
      <Start>
        <Stream url="wss://${req.headers.host}/"/>
      </Start>
      <Say>I will stream the next 60 seconds of audio through your websocket</Say>
      <Pause length="60" />
    </Response>
  `);
});

export default router