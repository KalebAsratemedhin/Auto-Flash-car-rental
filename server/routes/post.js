const express = require('express');
const router = express.Router();
const { postCar, getCurrentUserCars, getAllCars, getOneCar } = require('../controllers/post');
const multer = require('multer');
const path = require('path');
const { authenticateUser } = require('../middleware/auth');

 
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

router.post('/', authenticateUser, upload.single('photo'), postCar);
router.get('/current-user', authenticateUser, getCurrentUserCars);
router.get('/:carId', getOneCar);
router.get('/', getAllCars);


module.exports = router;
