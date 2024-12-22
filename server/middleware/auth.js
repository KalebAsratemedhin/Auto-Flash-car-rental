import jwt from 'jsonwebtoken'

export const authenticateUser = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; 
    
    console.log('token', token, req.body)
    
    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).json({ message: 'Invalid token.' });
    }
};

export const isAdmin = (req, res, next) => {
    console.log('user body ', req.body)
    if (req.user.role == 'admin' || req.user.role == 'super-admin') {
        next();
    } else{
        return res.status(403).json({ message: 'Access denied. Admins only.' });
    }
}; 

export const isSuperAdmin = (req, res, next) => {
    if (req.user.role !== 'super-admin') {
        return res.status(403).json({ message: 'Access denied. Super Admins only.' });
    }
    next();
}; 

