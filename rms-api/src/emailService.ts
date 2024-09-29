import nodemailer from 'nodemailer';

// Create a transporter for sending emails
const transporter = nodemailer.createTransport({
  service: 'gmail', // Or your email service
  auth: {
    user: 'your-email@gmail.com', // Your email
    pass: 'your-email-password', // Your email password or app-specific password
  },
});

// Function to send an email
export const sendEmail = async (to: string, subject: string, text: string) => {
  const mailOptions = {
    from: 'your-email@gmail.com', // Sender address
    to, // Receiver's email address
    subject,
    text,
  };

  await transporter.sendMail(mailOptions);
};
