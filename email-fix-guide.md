# Email Service Fix Guide

## Problem
Users are not receiving confirmation emails after applying for jobs in production.

## Root Causes
1. **Missing Environment Variables** in Render deployment
2. **Gmail Security Restrictions** blocking automated emails
3. **Incorrect Email Configuration**

## Solutions

### Solution 1: Configure Environment Variables in Render

1. **Go to your Render dashboard**
2. **Navigate to your backend service**
3. **Go to Environment tab**
4. **Add these environment variables:**
   ```
   EMAIL_USER=your-actual-email@gmail.com
   EMAIL_PASS=your-gmail-app-password
   ```

### Solution 2: Get Gmail App Password

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Go to Google Account Settings** → Security
3. **Generate App Password** for "Mail"
4. **Use this 16-character password** as EMAIL_PASS

### Solution 3: Switch to Professional Email Service (Recommended)

Replace Gmail with a more reliable service:

#### Option A: SendGrid (Free tier: 100 emails/day)
```javascript
// Update backend/utils/email.js
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransporter({
  host: 'smtp.sendgrid.net',
  port: 587,
  secure: false,
  auth: {
    user: 'apikey',
    pass: process.env.SENDGRID_API_KEY
  }
});
```

#### Option B: Mailgun (Free tier: 5,000 emails/month)
```javascript
const transporter = nodemailer.createTransporter({
  host: 'smtp.mailgun.org',
  port: 587,
  secure: false,
  auth: {
    user: process.env.MAILGUN_SMTP_USER,
    pass: process.env.MAILGUN_SMTP_PASS
  }
});
```

### Solution 4: Add Error Logging

Update the email function to log errors properly:

```javascript
export const sendApplicationConfirmation = async (toEmail, jobTitle) => {
  try {
    // Check if email credentials are configured
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error('Email credentials not configured');
      return;
    }

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: toEmail,
      subject: `Application Confirmation - ${jobTitle}`,
      text: `Successfully applied for ${jobTitle}`,
      html: `
        <h2>Application Confirmation</h2>
        <p>You have successfully applied for the position: <strong>${jobTitle}</strong></p>
        <p>We will review your application and get back to you soon.</p>
      `
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', result.messageId);
  } catch (error) {
    console.error('Email sending failed:', error.message);
    // Log detailed error for debugging
    console.error('Full error:', error);
  }
};
```

## Quick Fix Steps

1. **Set Environment Variables in Render:**
   - EMAIL_USER=your-email@gmail.com
   - EMAIL_PASS=your-app-password

2. **Test the email service:**
   - Check Render logs for email errors
   - Verify environment variables are loaded

3. **If Gmail doesn't work, switch to SendGrid:**
   - Sign up for free SendGrid account
   - Get API key
   - Update email configuration
   - Set SENDGRID_API_KEY in Render

## Testing

Add a test endpoint to verify email functionality:

```javascript
// Add to your routes
app.post('/test-email', async (req, res) => {
  try {
    await sendApplicationConfirmation('test@example.com', 'Test Job');
    res.json({ message: 'Test email sent' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```
