import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
import User from '../models/user.js';

const secret = process.env.JWT_SECRET;

export const signup = async (req, res) => {
    try {
        const { fullName, password, email, phoneNumber } = req.body;

        const duplicate = await User.findOne({ email });
        if (duplicate) {
            return res.error('Duplicate account found.', 409);
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            fullName,
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
            return res.error('User not found.', 404);
        }

        const resetToken = crypto.randomBytes(32).toString('hex');
        user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
        user.resetPasswordExpires = Date.now() + 3600000; 
        await user.save();

        res.success('Password reset link sent to email.', 200, { resetToken });
    } catch (error) {
        res.error('Internal server error.', 500, [error.message]);
    }
};

export const verifyEmail = async (req, res) => {
    try {
        const { token } = req.query;

        if (!token) {
            return res.error('No token provided.', 400);
        }

        const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

        const user = await User.findOne({
            emailVerificationToken: hashedToken,
        });

        if (!user) {
            return res.error('Invalid or expired token.', 400);
        }

        user.emailVerified = true;
        user.emailVerificationToken = undefined; 
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



