const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
  type: String,
  required: true,
  unique: true,
  validate: {
    validator: function (email) {
      return /\.iitkgp\.ac\.in$/.test(email); // ✅ ends with .iitkgp.ac.in (subdomains allowed)
    },
    message: 'Only IIT Kharagpur emails allowed',
  },
},
  password: {
    type: String,
    required: true
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  verificationToken: String
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
