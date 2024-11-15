import jwt from 'jsonwebtoken'

const authenticateUser = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; 
    
    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        console.log('req.user', req.user, 'middleware')
        next();
    } catch (error) {
        res.status(400).json({ message: 'Invalid token.' });
    }
};

export default authenticateUser;

