import express from 'express';
import { createRent, cancelRent, updateRent, evaluateRent, getCurrentUserRents, getRentById } from '../controllers/rent.js';
import {authenticateUser, isAdmin, isSuperAdmin} from '../middleware/auth.js';

const router = express.Router();

router.post('/cars/:carId', authenticateUser, createRent);
router.get('/current-user', authenticateUser, getCurrentUserRents);
router.get('/:rentId', authenticateUser, getRentById);
router.patch('/:rentId/evaluate', authenticateUser, evaluateRent);
router.patch('/:rentId', authenticateUser, updateRent);
router.delete('/:rentId', authenticateUser, cancelRent);


export default router;
