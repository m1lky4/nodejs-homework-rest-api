const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middleware/auth');
const userController = require('../../controllers/userController');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/logout', authMiddleware, userController.logout);
router.get('/current', authMiddleware, userController.getCurrentUser);

module.exports = router;
