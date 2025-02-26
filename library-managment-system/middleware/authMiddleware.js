// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../configs/config');

function authenticateToken(req, res, next) {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) {
        return res.status(403).json({ message: 'Access denied' });
    }

    try {
        const user = jwt.verify(token, JWT_SECRET);
        req.user = user; 
        next(); 
    } catch (error) {
        return res.status(403).json({ message: 'Invalid or expired token' });
    }
}

module.exports = authenticateToken;
