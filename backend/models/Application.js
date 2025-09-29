import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({
  jobId: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  resumeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Resume' },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  totalExperience: { type: String, required: true },
  currentCTC: { type: String, required: true },
  expectedCTC: { type: String, required: true },
  skills: [{ type: String }],
  status: { type: String, default: 'Applied' },
}, { timestamps: true });

const Application = mongoose.model('Application', applicationSchema);

export default Application;