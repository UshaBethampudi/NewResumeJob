import nodemailer from 'nodemailer';

// Create a simple transporter (you can configure this with your email service)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'your-email@gmail.com',
    pass: process.env.EMAIL_PASS || 'your-app-password'
  }
});

// Simple function to send application confirmation email
export const sendApplicationConfirmation = async (toEmail, jobTitle) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER || 'your-email@gmail.com',
      to: toEmail,
      subject: `Application Confirmation - ${jobTitle}`,
      text: `Successfully applied for ${jobTitle}`
    };

    await transporter.sendMail(mailOptions);
    console.log(`Confirmation email sent to ${toEmail} for job: ${jobTitle}`);
  } catch (error) {
    console.error('Error sending confirmation email:', error);
    // Don't throw error to avoid breaking the application flow
  }
};