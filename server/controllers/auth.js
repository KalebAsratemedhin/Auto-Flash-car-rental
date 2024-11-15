import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
import User from '../models/user.js';

const secret = process.env.JWT_SECRET;

 
export const signup = async (req, res) => {
    try {
        const { fullName, password, email, phoneNumber } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);
        const duplicate = await User.findOne({ email });

        if (duplicate) {
            return res.error('Duplicate account found.', 409, []);
        }

        const user = await User.create({
            fullName,
            phoneNumber,
            email,
            password: hashedPassword,
        });

        const payload = { id: user._id, role: user.role };
        const token = jwt.sign(payload, secret, { expiresIn: '1h' });

        res.success('Sign up successful.', 201, { accessToken: token, id: user._id, role: user.role })

    } catch (error) {
        res.error('Internal server error.', 500, [error]);
    }
};


export const signin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Incorrect password' });
        }

        const payload = { id: user._id, role: user.role };
        const token = jwt.sign(payload, secret, { expiresIn: '2h' });

        res.status(200).json({ accessToken: token, id: user._id, role: user.role });
    } catch (error) {
        res.error('Internal server error.', 500, [error]);
    }
};


export const googleAuth= async (req, res) => {

    try {
        const {id, name, email, image} = req.body

        let user = await User.findOne({ email });

        if (!user) {
            user = await User.create({
                fullName: name,
                email: email,
                googleId: id,
                profilePic: image,
            });
        }

        if (user && !user.googleId){
            return res.error('Another signin option exists.', 400, [])
        }



        const payload = { id: user._id, role: user.role };
        const token = jwt.sign(payload, secret, { expiresIn: '2h' });

        res.success('Google auth successful', 200, { accessToken: token, id: user._id, role: user.role, name: user.fullName, email: user.email, image: user.profilePic});

        
    } catch (error) {
        res.error('Internal server error.', 500, [error]);
    }
    
};


