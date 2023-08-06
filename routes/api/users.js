const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/user');
const authMiddleware = require('../../middleware/auth');

router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'Email in use' });
    }

    const newUser = new User({ email });
    newUser.setPassword(password);
    await newUser.save();

    res.status(201).json({ user: { email: newUser.email, subscription: newUser.subscription } });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !user.validPassword(password)) {
      return res.status(401).json({ message: 'Email or password is wrong' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    user.token = token;
    await user.save();

    res.status(200).json({ token, user: { email: user.email, subscription: user.subscription } });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/logout', authMiddleware, async (req, res) => {
  try {
    req.user.token = null;
    await req.user.save();

    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/current', authMiddleware, async (req, res) => {
  try {
    res.status(200).json({ email: req.user.email, subscription: req.user.subscription });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
