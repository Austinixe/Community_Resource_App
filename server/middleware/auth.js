const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  try {
    // Get token from header
    const token = req.header('Authorization');

    // Check if no token
    if (!token) {
      return res.status(401).json({ 
        success: false,
        message: 'No token, authorization denied' 
      });
    }

    // Remove 'Bearer ' from token string
    const tokenValue = token.replace('Bearer ', '');

    // Verify token
    const decoded = jwt.verify(tokenValue, process.env.JWT_SECRET);

    // Add user id to request object
    req.userId = decoded.id;
    
    next();
  } catch (error) {
    console.error('Auth middleware error:', error.message);
    res.status(401).json({ 
      success: false,
      message: 'Token is not valid' 
    });
  }
};

module.exports = auth;