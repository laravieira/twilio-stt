FROM node:20

ENV ENVIRONMENT 'development'
ENV HOST 'http://localhost:8080'
ENV PORT 8080
ENV PHONE_NUMBER '+1 (888) 888 8888'
ENV TWILIO_ACCOUNT_SID ''
ENV TWILIO_AUTH_TOKEN ''
ENV TWILIO_PHONE_NUMBER_SID ''
ENV LANGUAGE_CODE 'en-US'
ENV GOOGLE_API_KEY ''

WORKDIR /app
COPY . .

RUN npm install
RUN npm run build
COPY src/templates dist/templates

EXPOSE $PORT

CMD ["npm", "run", "start"]