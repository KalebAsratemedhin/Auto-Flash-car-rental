const express = require('express');
const router = express.Router();
const { postCar, getCurrentUserCars, getAllCars, getOneCar } = require('../controllers/post');
const { authenticateUser } = require('../middleware/auth');
const upload = require('../middleware/fileUpload')

router.post('/', authenticateUser,(req, res, next) => {
  console.log('req', req.body)
  next()
}, upload.single('photo'), postCar);
router.get('/current-user', authenticateUser, getCurrentUserCars);
router.get('/:carId', getOneCar);
router.get('/', getAllCars);


module.exports = router;
