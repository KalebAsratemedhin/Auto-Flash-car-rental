import express from 'express';
import { postCar, getAllCars, getOneCar, getAdminCars } from '../controllers/post.js';
import {authenticateUser, isAdmin} from '../middleware/auth.js';
import upload from '../middleware/fileUpload.js';

const router = express.Router();

router.post('/', authenticateUser, isAdmin, upload.single('photo'), postCar);
router.get('/:carId', getOneCar);
router.get('/admins/:userId', authenticateUser, isAdmin, getAdminCars);
router.get('/', getAllCars);



export default router;
