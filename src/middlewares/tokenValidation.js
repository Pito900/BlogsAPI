const { tokenVerification } = require('../jwt/JWT');

 const validateToken = async (req, res, next) => {
    const { authorization } = req.headers;
     const result = tokenVerification(authorization);
     if (result === 'Token not found') {
        return res.status(401).json({ message: 'Token not found' });
     } if (result === 'Expired or invalid token') {
        return res.status(401).json({ message: 'Expired or invalid token' });
     }
     next();
 };

module.exports = { 
    validateToken, 
}; 