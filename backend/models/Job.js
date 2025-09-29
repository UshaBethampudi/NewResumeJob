import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  jobTitle: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String, required: true },
  experience: { type: String, required: true },
  salary: { type: String, required: true },
  jobDescription: { type: String, required: true },
}, { timestamps: true });

const Job = mongoose.model('Job', jobSchema);

export default Job;