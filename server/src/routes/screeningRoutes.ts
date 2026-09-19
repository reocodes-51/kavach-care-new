import { Router } from 'express';
import {
  createScreening,
  getScreeningById,
  getPatientScreenings
} from '../controllers/screeningController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/', protect, createScreening);
router.get('/:id', protect, getScreeningById);
router.get('/patient/:patientId', protect, getPatientScreenings);

export default router;
