FROM node:20

ENV ENVIRONMENT 'development'
ENV HOST 'http://localhost:8080'
ENV PORT 8080
ENV PHONE_NUMBER '+1 (650) 772 5756'
ENV TWILIO_ACCOUNT_SID ''
ENV TWILIO_AUTH_TOKEN ''
ENV TWILIO_PHONE_NUMBER_SID ''
ENV LANGUAGE_CODE 'en-US'
ENV GOOGLE_APPLICATION_CREDENTIALS_FILE ''
ENV GOOGLE_APPLICATION_CREDENTIALS 'service-account.json'

WORKDIR /app
COPY . .

RUN npm install
RUN npm run build
COPY /app/src/templates /app/dist/templates
RUN rm -rf /app/src
RUN rm -rf /app/node_modules
RUN touch /app/service-account.json && echo $GOOGLE_APPLICATION_CREDENTIALS_FILE > /app/service-account.json

EXPOSE $PORT

CMD ["npm", "run", "start"]