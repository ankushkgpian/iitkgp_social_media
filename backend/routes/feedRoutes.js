const express = require('express');
const router = express.Router();
const { getFeed, createPost } = require('../controllers/feedController');
const auth = require('../middleware/auth');

router.get('/feed', auth, getFeed);
router.post('/feed', auth, createPost); // ✅ Create post

module.exports = router;
