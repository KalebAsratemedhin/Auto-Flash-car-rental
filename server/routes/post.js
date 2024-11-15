import express from 'express';
import { postCar, getCurrentUserCars, getAllCars, getOneCar, getUserCars } from '../controllers/post.js';
import authenticateUser from '../middleware/auth.js';
import upload from '../middleware/fileUpload.js';

const router = express.Router();

router.post('/', authenticateUser, upload.single('photo'), postCar);
router.get('/current-user', authenticateUser, getCurrentUserCars);
router.get('/all', getAllCars);
router.get('/:carId', getOneCar);
router.get('/', getUserCars);



export default router;
