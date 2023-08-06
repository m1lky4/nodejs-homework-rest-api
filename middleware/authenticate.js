
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authenticate = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const decodedToken = jwt.verify(token, 'your-secret-key'); // Замініть 'your-secret-key' на ваш ключ
    if (!decodedToken) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const user = await User.findOne({ _id: decodedToken._id, token });
    if (!user) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authenticate;
