const express = require('express');
const router = express.Router();
const { auth } = require('../middlewares/auth');
const { validateLogin } = require('../middlewares/validate');
const { loginUser, getCurrentUser } = require('../controllers/users');

// Login route
router.post('/login', validateLogin, loginUser);

// Get current user
router.get('/me', auth, getCurrentUser);

module.exports = router;