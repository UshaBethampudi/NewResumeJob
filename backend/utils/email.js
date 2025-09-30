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
    // Check if email credentials are configured
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error('❌ Email credentials not configured. Please set EMAIL_USER and EMAIL_PASS environment variables.');
      return;
    }

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: toEmail,
      subject: `Application Confirmation - ${jobTitle}`,
      text: `Successfully applied for ${jobTitle}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Application Confirmation</h2>
          <p>Dear Applicant,</p>
          <p>You have successfully applied for the position: <strong>${jobTitle}</strong></p>
          <p>We will review your application and get back to you soon.</p>
          <p>Thank you for your interest!</p>
          <br>
          <p>Best regards,<br>Resume Job Team</p>
        </div>
      `
    };

    const result = await transporter.sendMail(mailOptions);
    console.log(`✅ Confirmation email sent to ${toEmail} for job: ${jobTitle}`);
    console.log(`📧 Email ID: ${result.messageId}`);
  } catch (error) {
    console.error('❌ Error sending confirmation email:', error.message);
    console.error('🔍 Full error details:', error);
    // Don't throw error to avoid breaking the application flow
  }
};