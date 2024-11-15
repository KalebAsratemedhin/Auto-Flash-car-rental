import express from 'express';
import { createRent, cancelRent, evaluateRent, getCurrentUserRents } from '../controllers/rent.js';
import {authenticateUser, isAdmin, isSuperAdmin} from '../middleware/auth.js';

const router = express.Router();

router.post('/cars/:carId', authenticateUser, createRent);
router.get('/current-user', authenticateUser, getCurrentUserRents);
router.patch('/:rentId/evaluate', authenticateUser, evaluateRent);
router.delete('/:rentId', authenticateUser, cancelRent);


export default router;
 