const Comment = require('../models/Comment');

exports.addComment = async (req, res) => {
  try {
    const { content, anonymous } = req.body;
    const { postId } = req.params;

    const comment = new Comment({
      content,
      anonymous,
      author: req.user.id,
      post: postId
    });

    await comment.save();
    await comment.populate('author', 'name email');

    res.status(201).json(comment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add comment' });
  }
};

exports.getComments = async (req, res) => {
  try {
    const comments = await Comment.find({ post: req.params.postId })
      .populate('author', 'name email')
      .sort({ createdAt: -1 });

    res.json(comments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch comments' });
  }
};

exports.upvoteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) return res.status(404).json({ error: 'Comment not found' });

    const userId = req.user.id;
    const hasUpvoted = comment.upvotedBy.includes(userId);

    if (hasUpvoted) {
      comment.upvotes -= 1;
      comment.upvotedBy.pull(userId);
    } else {
      comment.upvotes += 1;
      comment.upvotedBy.push(userId);
    }

    await comment.save();
    res.json({ upvotes: comment.upvotes });
  } catch (err) {
    res.status(500).json({ error: 'Upvote failed' });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) return res.status(404).json({ error: 'Comment not found' });

    if (comment.author.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Unauthorized to delete' });
    }

    await comment.deleteOne();
    res.json({ message: 'Comment deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Delete failed' });
  }
};
