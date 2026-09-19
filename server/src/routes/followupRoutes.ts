import { Router } from 'express';
import {
  getFollowUps,
  createFollowUp,
  updateFollowUp
} from '../controllers/followupController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/', protect, getFollowUps);
router.post('/', protect, createFollowUp);
router.put('/:id', protect, updateFollowUp);

export default router;
