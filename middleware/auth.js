const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ message: 'Not authorized' });
  }

  try {
    const jwtSecret = process.env.JWT_SECRET;
    const decodedToken = jwt.verify(token, jwtSecret);
    const user = await User.findById(decodedToken.userId);
    if (!user || user.token !== token) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Not authorized' });
  }
};

module.exports = authMiddleware;
