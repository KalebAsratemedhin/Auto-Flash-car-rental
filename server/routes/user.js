import express from 'express';
import { getCurrentUser, upgradeToAdmin, getUserSummary, getUserById, getAdminSummary, updateUserProfile } from '../controllers/user.js';
import {authenticateUser, isAdmin, isSuperAdmin} from '../middleware/auth.js';

const router = express.Router();

router.get('/current-user', authenticateUser, getCurrentUser);
router.get('/summary/:id', authenticateUser, getUserSummary);
router.get('/summary/admins/:id', authenticateUser, getAdminSummary);

router.get('/:id', authenticateUser, getUserById);
router.patch('/current-user', authenticateUser, updateUserProfile);
router.patch('/:id', authenticateUser, isSuperAdmin, upgradeToAdmin);


export default router;
