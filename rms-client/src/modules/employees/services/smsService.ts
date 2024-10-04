// smsService.ts
import { Twilio } from 'twilio';

const accountSid = 'your_account_sid'; // Replace with your Twilio SID
const authToken = 'your_auth_token'; // Replace with your Twilio Auth Token
const client = new Twilio(accountSid, authToken);

export const sendSMS = async (to: string, body: string) => {
  try {
    await client.messages.create({
      body,
      from: '+your_twilio_number', // Your Twilio phone number
      to, // Employee's phone number
    });
    console.log('SMS sent successfully');
  } catch (error) {
    console.error('Error sending SMS:', error);
  }
};
