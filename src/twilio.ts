import twilio from 'twilio';

function init(): twilio.Twilio {
  if(!process.env.TWILIO_ACCOUNT_SID)
    throw new Error('TWILIO_ACCOUNT_SID is required');
  if(!process.env.TWILIO_AUTH_TOKEN)
    throw new Error('TWILIO_AUTH_TOKEN is required');
  const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER_SID } = process.env;

  return twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
}

function updateVoiceUrl(client: twilio.Twilio, voiceUrl: string): void {
  if(!process.env.TWILIO_PHONE_NUMBER_SID)
    throw new Error('TWILIO_PHONE_NUMBER_SID is required');
  const { TWILIO_PHONE_NUMBER_SID } = process.env;

  client.incomingPhoneNumbers(TWILIO_PHONE_NUMBER_SID)
    .update({ voiceUrl })
    .then(phoneNumber => console.debug('voice-url', phoneNumber.voiceUrl))
    .catch(error => console.error(error));
}

export { init, updateVoiceUrl }