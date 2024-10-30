const express = require('express');
const router = express.Router();
const { createRent, approveRent, confirmReturn, getCurrentUserRents, getRentRequests } = require('../controllers/rent');
const { authenticateUser } = require('../middleware/auth');

router.post('/', authenticateUser, createRent);
router.get('/current-user', authenticateUser, getCurrentUserRents);
router.get('/', authenticateUser, getRentRequests);

router.patch('/approve', authenticateUser, approveRent);
router.patch('/returned', authenticateUser, confirmReturn);

module.exports = router;
 