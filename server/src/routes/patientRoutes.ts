import { Router } from 'express';
import {
  getPatients,
  getPatientById,
  createPatient,
  updatePatient
} from '../controllers/patientController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/', protect, getPatients);
router.get('/:id', protect, getPatientById);
router.post('/', protect, createPatient);
router.put('/:id', protect, updatePatient);

export default router;
