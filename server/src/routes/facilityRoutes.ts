import { Router } from 'express';
import {
  getFacilities,
  getFacilityById,
  matchFacilitiesEndpoint
} from '../controllers/facilityController.js';

const router = Router();

router.get('/', getFacilities);
router.post('/match', matchFacilitiesEndpoint);
router.get('/:id', getFacilityById);

export default router;
