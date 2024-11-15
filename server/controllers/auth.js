import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
import User from '../models/user.js';

const secret = process.env.JWT_SECRET;

 
export const signup = async (req, res) => {
    try {
        console.log('body', req.body)
        const { fullName, password, email, phoneNumber } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);
        const duplicate = await User.findOne({ email });

        if (duplicate) {
            return res.status(409).json({ message: 'Duplicate account found.' });
        }

        const user = await User.create({
            fullName,
            phoneNumber,
            email,
            password: hashedPassword,
        });

        const payload = { id: user._id, role: user.role };
        const token = jwt.sign(payload, secret, { expiresIn: '1h' });

        res.status(201).json({ accessToken: token, id: user._id, role: user.role });

    } catch (error) {
        res.status(500).json({ message: 'Server Error.' });
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
        res.status(500).json({ message: error.message });
    }
};


export const googleAuth= async (req, res) => {
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
        return res.status(403).json({message: "Another signin option exists."})
    }



    const payload = { id: user._id, role: user.role };
    const token = jwt.sign(payload, secret, { expiresIn: '2h' });

    res.status(200).json({ accessToken: token, id: user._id, role: user.role, name: user.fullName, email: user.email, image: user.profilePic});

};



export const updateUserProfile = async (req, res) => {
    try {
        const { id } = req.user;
        const update = req.body;

        const updatedUser = await User.findByIdAndUpdate(id, update, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error.' });
    }
};
