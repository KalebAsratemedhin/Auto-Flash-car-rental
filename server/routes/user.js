import express from 'express';
import { getCurrentUser, upgradeToAdmin, getSummary, getAllUsers, getAnalytics, getUserById, updateUserProfile } from '../controllers/user.js';
import {authenticateUser, isSuperAdmin} from '../middleware/auth.js';

const router = express.Router();

router.get('/me', authenticateUser, getCurrentUser);
router.get('/summary/:id', authenticateUser, getSummary);
router.get('/analytics/:id', authenticateUser, getAnalytics);



router.get('/:id', authenticateUser, getUserById);
router.get('/', authenticateUser, isSuperAdmin, getAllUsers);

router.patch('/current-user', authenticateUser, updateUserProfile);
router.patch('/:id/admin', authenticateUser, isSuperAdmin, upgradeToAdmin);


export default router;
