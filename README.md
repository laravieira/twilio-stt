## Twilio Call STT (Speech to Text)
This is a simple project that demonstrates how to use Twilio to make a call and transcribe the audio to text using Google Cloud Speech-to-Text API.
This project is built using Node.js, Express.js, Twilio, and Google Cloud Speech-to-Text API.

It has the highlight of programmatically setting up NGROK tunnel and updating the Twilio webhook URL to the NGROK.

## Run locally
- Create a `.env` file and populate it.
- Create a `service-account.json` file and populate it.
- Run:
```shell
npm install
npm run dev
```
- Open the browser and navigate to `http://localhost:8080`

###### ENVIRONMENT=development will setup ngrok tunnel for you and update the twilio callback url.