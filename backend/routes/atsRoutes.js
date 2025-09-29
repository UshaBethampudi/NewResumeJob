import express from 'express';
import { scoreResume } from '../controllers/atsController.js';
import upload from '../middlewares/uploadMiddleware.js';

const router = express.Router();

router.post('/score', upload.single('resume'), scoreResume);

export default router;