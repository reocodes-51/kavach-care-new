import { Router } from 'express';
import {
  getReferrals,
  getReferralById,
  getReferralByCode,
  createReferral,
  updateReferralStatus
} from '../controllers/referralController.js';
import { protect, optionalAuth } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/track/:code', getReferralByCode);
router.get('/', optionalAuth, getReferrals);
router.get('/:id', optionalAuth, getReferralById);
router.post('/', protect, createReferral);
router.put('/:id/status', protect, updateReferralStatus);

export default router;
