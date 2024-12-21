import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import User from '../models/user.js';

const resetPasswordUrl = process.env.FRONTEND_URL + '/reset-password'
const secret = process.env.JWT_SECRET;

export const signup = async (req, res) => {
    try {
        const { firstName, lastName, password, email, phoneNumber } = req.body;

        const duplicate = await User.findOne({ email });
        if (duplicate) {
            return res.error('Duplicate account found.', 409);
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            firstName,
            lastName,
            phoneNumber,
            email,
            password: hashedPassword,
        }); 

        const payload = { id: user._id, role: user.role };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.success('Sign up successful.', 201, { accessToken: token, id: user._id, role: user.role });
    } catch (error) {
        res.error('Internal server error.', 500, [error.message]);
    }
};

export const signin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.error('User not found.', 404);
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.error('Incorrect password.', 400);
        }

        const payload = { id: user._id, role: user.role };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '2h' });

        res.success('Sign in successful.', 200, { accessToken: token, id: user._id, role: user.role });
    } catch (error) {
        res.error('Internal server error.', 500, [error.message]);
    }
};


export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.error('No user found with this email.', 404);
        }

        const resetToken = crypto.randomBytes(32).toString('hex');
        const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

        user.resetPasswordToken = hashedToken;
        user.resetPasswordExpires = Date.now() + 3600 * 1000;
        await user.save();

        const resetLink = `${resetPasswordUrl}?token=${resetToken}`;

        const transporter = nodemailer.createTransport({
            service: 'Gmail', 
            auth: {
                user: process.env.EMAIL_USER, 
                pass: process.env.EMAIL_PASS, 
            },
        });

        const mailOptions = {
            from: `"${process.env.APP_NAME}" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: 'Password Reset Request',
            html: `
                <p>Hello ${user.fullName},</p>
                <p>You requested a password reset. Click the link below to reset your password:</p>
                <a href="${resetLink}">${resetLink}</a>
                <p>If you did not request this, please ignore this email.</p>
                <p>The link will expire in 1 hour.</p>
            `,
        };

        await transporter.sendMail(mailOptions);

        res.success('Password reset link sent to your email.', 200);
    } catch (error) {
        res.error('Internal server error.', 500, [error.message]);
    }
};


export const resetPassword = async (req, res) => {
    try {
        const { token } = req.query;
        const { password } = req.body;

        if (!token) {
            return res.error('Token is required.', 400);
        }


        const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

        const user = await User.findOne({
            resetPasswordToken: hashedToken,
            resetPasswordExpires: { $gt: Date.now() }, 
        });

        if (!user) {
            return res.error('Invalid or expired token.', 400);
        }


        user.password = await bcrypt.hash(password, 10);
        user.resetPasswordToken = undefined; 
        user.resetPasswordExpires = undefined;  
        await user.save();

        res.success('Password has been reset successfully.', 200);
    } catch (error) {
        res.error('Internal server error.', 500, [error.message]);
    }
};



export const sendVerificationEmail = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.error('User not found.', 404);
        }

        if (user.isVerified) {
            return res.success('User is already verified.', 200);
        }

        const verificationToken = crypto.randomBytes(32).toString('hex');
        const hashedToken = crypto.createHash('sha256').update(verificationToken).digest('hex');

        user.verificationToken = hashedToken;
        user.verificationTokenExpires = Date.now() + 3600 * 1000; 
        await user.save();

        const verifyEmailUrl = process.env.FRONTEND_URL + '/verify-email'
        const verificationLink = `${verifyEmailUrl}?token=${verificationToken}`;

        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: `"${process.env.APP_NAME}" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: 'Verify Your Email Address',
            html: `
                <p>Hello ${user.fullName},</p>
                <p>Thank you for registering with ${process.env.APP_NAME}. Please verify your email address by clicking the link below:</p>
                <a href="${verificationLink}">${verificationLink}</a>
                <p>If you did not register, please ignore this email.</p>
                <p>The link will expire in 1 hour.</p>
            `,
        };

        await transporter.sendMail(mailOptions);

        res.success('Verification email sent.', 200);
    } catch (error) {
        res.error('Internal server error.', 500, [error.message]);
    }
};

export const verifyEmail = async (req, res) => {
    try {
        const { token } = req.query;

        if (!token) {
            return res.error('Token is required.', 400);
        }

        const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

        const user = await User.findOne({
            verificationToken: hashedToken,
            verificationTokenExpires: { $gt: Date.now() }, 
        });

        if (!user) {
            return res.error('Invalid or expired token.', 400);
        }

        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpires = undefined; 
        await user.save();

        res.success('Email verified successfully.', 200);
    } catch (error) {
        res.error('Internal server error.', 500, [error.message]);
    }
};


export const googleAuth = async (req, res) => {
    try {
        const { id, name, email, image } = req.body;

        let user = await User.findOne({ email });

        if (!user) {
            user = await User.create({
                fullName: name,
                email,
                googleId: id,
                profilePic: image,
                emailVerified: true, 
            });
        }

        if (user && !user.googleId) {
            return res.error('Another signin option exists for this email.', 400);
        }

        const payload = { id: user._id, role: user.role };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '2h' });

        res.success('Google authentication successful.', 200, {
            accessToken: token,
            id: user._id,
            role: user.role,
            name: user.fullName,
            email: user.email,
            image: user.profilePic,
        });
    } catch (error) {
        res.error('Internal server error.', 500, [error.message]);
    }
};



