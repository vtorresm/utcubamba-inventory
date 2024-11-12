import { Router } from 'express';
import { auth } from '../middleware/auth.middleware';
import {
  generatePredictions,
  getPredictions,
  getMedicationPrediction
} from '../controllers/prediction.controller';

const router = Router();

router.post('/generate', auth, generatePredictions);
router.get('/', auth, getPredictions);
router.get('/:id', auth, getMedicationPrediction);

export default router;