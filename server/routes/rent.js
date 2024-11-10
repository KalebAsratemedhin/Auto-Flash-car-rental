const express = require('express');
const router = express.Router();
const { createRent, cancelRent, evaluateRent, getCurrentUserRents } = require('../controllers/rent');
const { authenticateUser } = require('../middleware/auth');

router.post('/cars/:carId', authenticateUser, createRent);
router.get('/current-user', authenticateUser, getCurrentUserRents);
router.patch('/:rentId/evaluate', authenticateUser, evaluateRent);
router.delete('/:rentId', authenticateUser, cancelRent);


module.exports = router;
 