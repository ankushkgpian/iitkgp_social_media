const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const sendEmail = require('../utils/sendEmail'); // Make sure this is at the top

exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  const iitkgpEmailRegex = /\.iitkgp\.ac\.in$/;
  if (!iitkgpEmailRegex.test(email)) {
    return res.status(400).json({ error: 'Only IIT Kharagpur emails allowed' });
  }


  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = crypto.randomBytes(32).toString('hex');

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      verificationToken,
    });

    await newUser.save();

    // ✅ SEND VERIFICATION EMAIL
    const verifyUrl = `${process.env.FRONTEND_URL}/verify/${verificationToken}`;
    await sendEmail(email, 'Verify your KGP account', `Click here to verify: ${verifyUrl}`);

    res.status(201).json({ message: 'Signup successful. Check your email to verify your account.' });
  } catch (err) {
    console.error('❌ Signup error:', err);
    res.status(500).json({ error: 'Signup failed' });
  }
};


exports.verifyEmail = async (req, res) => {
  try {
    const user = await User.findOne({ verificationToken: req.params.token });
    if (!user) return res.status(400).json({ error: 'Invalid or expired token' });

    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();

    res.json({ message: 'Email verified. You can now login.' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Verification failed' });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });

    if (!user.isVerified) return res.status(401).json({ error: 'Email not verified' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.json({ token, user: { name: user.name, email: user.email } });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Login failed' });
  }
};
