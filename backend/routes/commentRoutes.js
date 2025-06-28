const express = require('express');
const router = express.Router();
const {
  addComment,
  getComments,
  upvoteComment,
  deleteComment
} = require('../controllers/commentController');
const auth = require('../middleware/auth');

router.post('/:postId', auth, addComment);
router.get('/:postId', getComments);
router.patch('/upvote/:commentId', auth, upvoteComment);
router.delete('/:commentId', auth, deleteComment);

module.exports = router;
