import express from 'express';
import { createApplication, getApplications } from '../controllers/applicationsController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createApplication);
router.get('/', protect, getApplications);

export default router;