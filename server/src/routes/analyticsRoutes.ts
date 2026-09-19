import { Router } from 'express';
import { getDistrictAnalytics } from '../controllers/analyticsController.js';

const router = Router();

router.get('/district', getDistrictAnalytics);

export default router;
