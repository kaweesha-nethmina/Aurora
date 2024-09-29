import { Router } from 'express';
import { sendNotificationEmail } from '../services/sendNotification'; // adjust the path to where you store this service

const router = Router();

router.post('/send-notification', async (req, res) => {
  const { email, message } = req.body;

  if (!email || !message) {
    return res.status(400).json({ error: 'Email and message are required.' });
  }

  try {
    // Call the function to send the email
    await sendNotificationEmail(email, message);
    return res.status(200).json({ message: 'Notification sent successfully.' });
  } catch (error) {
    console.error('Error sending notification:', error);
    return res.status(500).json({ error: 'Failed to send notification.' });
  }
});

export default router;
