import {signin, signup, googleAuth, resetPassword, sendVerificationEmail, verifyEmail, forgotPassword} from '../controllers/auth.js';
import express from 'express';


const router = express.Router();

router.post('/signup', signup)
router.post('/signin', signin )
router.post('/google', googleAuth )

router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

router.post('/send-verification-email', sendVerificationEmail);
router.get('/verify-email', verifyEmail);


export default router  