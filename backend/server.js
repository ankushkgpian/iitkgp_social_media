const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();

// Middleware
app.use(cors({ origin: process.env.FRONTEND_URL }));
app.use(express.json());

// Import routes
const authRoutes = require('./routes/authRoutes');
const feedRoutes = require('./routes/feedRoutes');
const commentRoutes = require('./routes/commentRoutes');

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api', feedRoutes);
app.use('/api/comments', commentRoutes);

// DB connection and server start
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB Connected');
    app.listen(process.env.PORT || 5000, () => {
      console.log(`🚀 Server running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch((err) => console.error('❌ MongoDB connection error:', err));
