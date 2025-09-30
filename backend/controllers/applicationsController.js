import mongoose from 'mongoose';
import Application from '../models/Application.js';
import { jobExamples } from '../data/jobs.js';
import { sendApplicationConfirmation } from '../utils/email.js';

const createApplication = async (req, res) => {
  try {
    const application = new Application(req.body);
    await application.save();
    
    // Send confirmation email after successful application
    const job = jobExamples.find(j => j._id.toString() === application.jobId);
    if (job && application.email) {
      console.log(`📧 Attempting to send email to: ${application.email} for job: ${job.jobTitle}`);
      try {
        await sendApplicationConfirmation(application.email, job.jobTitle);
        console.log(`✅ Email sent successfully to ${application.email}`);
      } catch (emailError) {
        console.error(`❌ Failed to send email to ${application.email}:`, emailError.message);
      }
    } else {
      console.log(`⚠️ Email not sent - Job: ${!!job}, Email: ${application.email}`);
    }
    
    res.status(201).json(application);
  } catch (error) {
    res.status(500).json({ message: 'Error creating application', error });
  }
};

const getApplications = async (req, res) => {
  try {
    const applications = await Application.find({ userId: req.user.id });
    const populatedApplications = applications.map(application => {
      const job = jobExamples.find(j => j._id.toString() === application.jobId);
      return {
        ...application.toObject(),
        jobId: job,
      };
    });
    res.json(populatedApplications);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching applications', error });
  }
};

export { createApplication, getApplications };