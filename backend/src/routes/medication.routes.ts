import { Router } from 'express';
import { auth } from '../middleware/auth.middleware';
import {
  getAllMedications,
  getMedicationById,
  createMedication,
  updateMedication,
  deleteMedication,
  getMedicationMovements,
  getMedicationPredictions,
  getMedicationAlerts
} from '../controllers/medication.controller';

const router = Router();

router.get('/', auth, getAllMedications);
router.get('/:id', auth, getMedicationById);
router.post('/', auth, createMedication);
router.put('/:id', auth, updateMedication);
router.delete('/:id', auth, deleteMedication);
router.get('/:id/movements', auth, getMedicationMovements);
router.get('/:id/predictions', auth, getMedicationPredictions);
router.get('/:id/alerts', auth, getMedicationAlerts);

export default router;