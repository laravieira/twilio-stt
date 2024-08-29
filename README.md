[![Status Badge](https://status.laravieira.me/api/badge/37/status)](https://status.laravieira.me/)

## Twilio Call STT (Speech to Text)
> [twilio-stt.laravieira.me](https://twilio-stt.laravieira.me)

This is a simple project that demonstrates how to use Twilio to make a call and transcribe the audio to text using Google Cloud Speech-to-Text API.
This project is built using Node.js, Express.js, Twilio, and Google Cloud Speech-to-Text API.

It has the highlight of programmatically setting up NGROK tunnel and updating the Twilio webhook URL to the NGROK.

### Key Features:
- [x] Twilio Call API Integration
- [x] Google Cloud Speech-to-Text API Integration
- [x] WebSocket for Real-time Communication
- [x] NGROK Tunnel Programmatically Setup for Development
- [x] Twilio Webhook URL Programmatically Update
- [x] Frontend page to view the transcription in real-time
- [x] .env file for environment variables management
- [x] Service Account JSON file and API Key support for Google Cloud API
- [x] Dockerfile for containerization support

### Demonstration Video:
[![Twilio Call STT Demonstration](https://img.youtube.com/vi/jQE32WMjmVw/0.jpg)](https://www.youtube.com/watch?v=jQE32WMjmVw)


## Run locally
- Buy a Twilio Phone Number able to receive calls.
- Enable the Google Cloud Speech-to-Text API and get credentials.
- Create a `.env` file and populate it.
```properties
# development, production (development will setup ngrok tunnel for you)
ENVIRONMENT=development
# host is only used for production
HOST=
PORT=8080

# To programmatically update the Twilio Call webhook URL
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
TWILIO_PHONE_NUMBER_SID=

# Twilio Phone Number (just to display on the frontend)
PHONE_NUMBER=+1 (888) 888 8888
# Speech-to-Text API language code
LANGUAGE_CODE=en-US

# Google Cloud API credentials
GOOGLE_APPLICATION_CREDENTIALS=service-account.json
GOOGLE_API_KEY=
```
- Create a `service-account.json` file and populate it or set the `GOOGLE_API_KEY` in the `.env` file.
- Install the dependencies:
```shell
npm install
```
- Start development server (will auto restart on file changes):
```shell
npm run dev
```
- Open the browser and navigate to `http://localhost:8080`
