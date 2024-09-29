// import { Request, Response } from 'express';
// import nodemailer from 'nodemailer';

// // Send notification email
// export const sendNotificationEmail = async (req: Request, res: Response) => {
//   const { email, message } = req.body;

//   // Configure nodemailer transporter
//   const transporter = nodemailer.createTransport({
//     service: 'gmail', // Use your email service provider
//     auth: {
//       user: 'your-email@gmail.com', // Your email address
//       pass: 'your-email-password', // Your email password or app password
//     },
//   });

//   const mailOptions = {
//     from: 'your-email@gmail.com',
//     to: email,
//     subject: 'Reservation Update',
//     text: message,
//   };

//   try {
//     await transporter.sendMail(mailOptions);
//     return res.status(200).json({ message: 'Email sent successfully' });
//   } catch (error) {
//     console.error('Error sending email:', error);
//     return res.status(500).json({ message: 'Failed to send email', error });
//   }
// };
