import express from 'express';
import { seedJobs, getAllJobs } from '../controllers/jobsController.js';

const router = express.Router();

router.post('/seed', seedJobs);
router.get('/', getAllJobs);

export default router;