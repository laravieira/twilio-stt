import { Router } from 'express'

const router = Router();

router.get('/', (req, res) => res.json({
  app: 'Twilio STT',
  description: 'A simple API to convert speech to text using Twilio Calls and Google Speech to Text',
  version: '0.0.1',
  date: new Date()
}))

export default router