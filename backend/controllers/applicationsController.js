import Application from '../models/Application.js';
import nodemailer from 'nodemailer';

const createApplication = async (req, res) => {
  try {
    const application = new Application(req.body);
    await application.save();

    // TODO: Configure email service to send confirmation emails
    /*
    // Send confirmation email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: [req.body.email, 'ushasravanthi8@gmail.com'],
      subject: 'Job Application Confirmation',
      text: `Hi ${req.body.name},

Your application for the position of ${req.body.jobTitle} has been received.

Thank you,
Resume-Job Team`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
    */

    res.status(201).json(application);
  } catch (error) {
    res.status(500).json({ message: 'Error creating application', error });
  }
};

const getApplications = async (req, res) => {
  try {
    const applications = await Application.find({ userId: req.user.id }).populate('jobId');
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching applications', error });
  }
};

export { createApplication, getApplications };