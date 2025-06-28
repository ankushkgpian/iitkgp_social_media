const express = require('express');
const router = express.Router();
const {
  addComment,
  getComments,
  upvoteComment,
  deleteComment
} = require('../controllers/commentController');
const auth = require('../middleware/auth');

// Specific routes first ✅
router.patch('/:commentId/upvote', auth, upvoteComment);  // ✅ upvote
router.delete('/:commentId', auth, deleteComment);        // ✅ delete

// Generic ones after
router.post('/post/:postId', auth, addComment);           // ✅ create comment on post
router.get('/post/:postId', getComments);                 // ✅ get comments for post

module.exports = router;
