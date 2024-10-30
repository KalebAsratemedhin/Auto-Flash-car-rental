const {getCurrentUser, getUserSummary} = require('../controllers/user')
const {authenticateUser} = require('../middleware/auth')

const express = require('express');
const router = express.Router();
 

router.get('/current-user', authenticateUser, getCurrentUser)
router.get('/summary', authenticateUser, getUserSummary)



module.exports = router