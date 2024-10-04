// services/smsService.ts
import { Twilio } from 'twilio';

const accountSid = 'AC33bb1f920e0bb736eae415e7cf614556'; // Replace with your Twilio SID
const authToken = '8bf6c6eaa58875ccc5381cf371453baa'; // Replace with your Twilio Auth Token
const client = new Twilio(accountSid, authToken);

export const sendSMS = async (to: string, body: string) => {
  try {
    await client.messages.create({
      body,
      from: '+18507573190', // Replace with your Twilio number
      to,
    });
    console.log('SMS sent successfully');
  } catch (error) {
    console.error('Error sending SMS:', error);
  }
};
