import { Router } from 'express';
import { auth } from '../middleware/auth.middleware';
import {
  getMedicationAnalysis,
  getMarketTrends,
  analyzeConsumption
} from '../controllers/analysis.controller';

const router = Router();

router.get('/medications/:medicationId/analysis', auth, getMedicationAnalysis);
router.get('/market-trends/:medicationName', auth, getMarketTrends);
router.post('/analyze-consumption', auth, analyzeConsumption);

export default router;
