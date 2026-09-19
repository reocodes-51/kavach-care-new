import { Router } from 'express';
import {
  getAppointments,
  createAppointment,
  updateAppointment
} from '../controllers/appointmentController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/', protect, getAppointments);
router.post('/', protect, createAppointment);
router.put('/:id', protect, updateAppointment);

export default router;
