// middleware/auth.js
const jwt = require('jsonwebtoken');
const User = require('../Modal/User');

const JWT_SECRET = 'your_jwt_secret';

const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).send({ error: 'Not authenticated' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      throw new Error('User not found');
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).send({ error: 'Not authenticated' });
  }
};

module.exports = authMiddleware;
