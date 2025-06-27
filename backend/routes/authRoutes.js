const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  verifyEmail
} = require('../controllers/authController');

// POST /api/auth/signup
router.post('/signup', registerUser);

// POST /api/auth/login
router.post('/login', loginUser);

// GET /api/auth/verify/:token
router.get('/verify/:token', verifyEmail);

module.exports = router;
