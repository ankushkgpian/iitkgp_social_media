const express = require('express');
const router = express.Router();
const { addComment, getComments } = require('../controllers/commentController');
const auth = require('../middleware/auth');

router.post('/:postId', auth, addComment);      // POST a comment to a post
router.get('/:postId', getComments);            // GET comments for a post

module.exports = router;
