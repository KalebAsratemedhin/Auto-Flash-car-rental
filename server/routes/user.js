const {getCurrentUser, getUserSummary, getUserById} = require('../controllers/user')
const {authenticateUser} = require('../middleware/auth')

const express = require('express');
const router = express.Router();
 

router.get('/current-user', authenticateUser, getCurrentUser)
router.get('/summary/:id', authenticateUser, getUserSummary)
router.get('/:id', authenticateUser, getUserById)




module.exports = router