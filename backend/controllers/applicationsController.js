import mongoose from 'mongoose';
import Application from '../models/Application.js';

import { jobExamples } from '../data/jobs.js';

const createApplication = async (req, res) => {
  try {
    const application = new Application(req.body);
    await application.save();
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