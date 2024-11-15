import express from 'express';
import { getCurrentUser, getUserSummary, getUserById } from '../controllers/user.js';
import authenticateUser from '../middleware/auth.js';

const router = express.Router();

router.get('/current-user', authenticateUser, getCurrentUser);
router.get('/summary/:id', authenticateUser, getUserSummary);
router.get('/:id', authenticateUser, getUserById);

export default router;
