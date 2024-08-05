import { Router } from 'express';
import { auth } from '../middleware/auth.middleware';
import {
  createAlert,
  getAlerts,
  updateAlert,
  deleteAlert,
  checkAlerts
} from '../controllers/alert.controller';

const router = Router();

router.post('/', auth, createAlert);
router.get('/', auth, getAlerts);
router.put('/:id', auth, updateAlert);
router.delete('/:id', auth, deleteAlert);
router.post('/check', auth, checkAlerts);

export default router;