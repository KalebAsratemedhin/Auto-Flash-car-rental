const {signin, signup} = require('../controllers/auth')
const express = require('express');
const router = express.Router();
 

router.post('/signup', signup)

router.post('/signin', signin )

module.exports = router  