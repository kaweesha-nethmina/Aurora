import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

export const sendNotificationEmail = async (email: string, message: string) => {
  try {
    // Log environment variables for debugging
    console.log('GMAIL_USER:', process.env.GMAIL_USER);
    console.log('GMAIL_PASS:', process.env.GMAIL_PASS);

    // Create a transporter using Gmail's SMTP
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
          user: 'resortaurora63@gmail.com',  // Your Gmail address
          pass: 'ugwc nagv cuqu bkba',  // Paste the generated App Password here
      },
  });
  

    // Mail options
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: email,
      subject: 'Booking Cancellation Notification',
      text: message,
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};
