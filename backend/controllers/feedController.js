const Post = require('../models/Post');
const User = require('../models/User');

exports.getFeed = async (req, res) => {
  try {
    const posts = await Post.find().populate('author', 'name email').sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch feed' });
  }
};

exports.createPost = async (req, res) => {
  const { content } = req.body;

  if (!content || content.trim() === '') {
    return res.status(400).json({ error: 'Post content cannot be empty' });
  }

  try {
    const newPost = new Post({
      author: req.user.id,
      content,
    });

    await newPost.save();
    const populatedPost = await newPost.populate('author', 'name email');

    res.status(201).json(populatedPost);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create post' });
  }
};
