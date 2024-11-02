const {signin, signup, googleAuth} = require('../controllers/auth')
const express = require('express');
const router = express.Router();
 

router.post('/signup', signup)

router.post('/signin', signin )
router.post('/google', googleAuth )


module.exports = router  