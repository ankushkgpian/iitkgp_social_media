const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    required: true,
    trim: true
  },
  image: {
    type: String, // Optional image/file URL
  },
  tag: {
    type: String,
    enum: ['info', 'event', 'question'],
    default: 'info'
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);
