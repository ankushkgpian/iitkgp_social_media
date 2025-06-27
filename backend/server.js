const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express(); // ✅ Declare `app` first!

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

// ✅ Import Routes
const authRoutes = require('./routes/authRoutes');
const feedRoutes = require('./routes/feedRoutes'); // ✅ Add feedRoutes

// ✅ Use Routes
app.use('/api/auth', authRoutes);
app.use('/api', feedRoutes); // ✅ Mount feed routes under /api

// ✅ MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB Connected');
    app.listen(process.env.PORT || 5000, () => {
      console.log(`🚀 Server running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch((err) => console.error('❌ MongoDB connection error:', err));
