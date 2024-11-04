const express = require('express');
const router = express.Router();
const { postCar, getCurrentUserCars, getAllCars, getOneCar, getUserCars } = require('../controllers/post');
const { authenticateUser } = require('../middleware/auth');
const upload = require('../middleware/fileUpload')

router.post('/', authenticateUser, upload.single('photo'), postCar);
router.get('/current-user', authenticateUser, getCurrentUserCars);
router.get('/all', getAllCars);
router.get('/:carId', getOneCar);
router.get('/', getUserCars);



module.exports = router;
