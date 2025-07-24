const User = require('../models/auth');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;
const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existedEmail = await User.findOne({ email });
    if (existedEmail) {
      return res.status(400).json({ message: 'Email already exists' });
    }
    const existedUser = await User.findOne({ username });
    if (existedUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    if (req.file) {
      newUserData.profilePicture = `/uploads/${req.file.filename}`;
    }
    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, JWT_SECRET, { expiresIn: '1d' });

    res.status(201).json({
      message: 'Signup successful',
      token,
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'No account found with this email' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1d' });

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};
const updateProfilePicture = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming verifyToken middleware adds user info to req.user
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (req.file) {
      user.profilePicture = `/uploads/${req.file.filename}`;
      await user.save();
      return res.status(200).json({ message: 'Profile picture updated', profilePicture: user.profilePicture });
    } else {
      return res.status(400).json({ message: 'No file uploaded' });
    }
  } catch (error) {
    console.error('Update profile picture error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { signup, login, updateProfilePicture };

