const jwt = require('jsonwebtoken');
const User = require('../models/User');

const registerAdmin = async (req, res) => {
  const { name, email, password, phone } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: 'User already exists' });

    const user = new User({
      name,
      email,
      password,
      phone,
      accountType: 'admin',
    });
    await user.save();
    res.status(201).json({ message: 'Admin registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error registering admin', error: err });
  }
};

const loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const match = await user.matchPassword(password);
    if (!match) return res.status(400).json({ message: 'Invalid credentials' });

    if (user.accountType !== 'admin')
      return res.status(403).json({ message: 'Access denied' });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });
    res.status(200).json({ message: 'Login successful', token });
  } catch (err) {
    res.status(500).json({ message: 'Error logging in', error: err });
  }
};

// Register user
const register = async (req, res) => {
  const { name, email, password, phone } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: 'User already exists' });

    const user = new User({ name, email, password, phone });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error registering user', error: err });
  }
};

// Login user
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const match = await user.matchPassword(password);
    if (!match) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });
    res.status(200).json({ message: 'Login successful', token });
  } catch (err) {
    res.status(500).json({ message: 'Error logging in', error: err });
  }
};

const profile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ name: user.name, email: user.email });
  } catch (err) {
    res.status(500).json({ message: 'Error getting user profile', error: err });
  }
};

const updateProfile = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.name = name || user.name;
    user.email = email || user.email;
    if (password) user.password = password;

    await user.save();
    res.status(200).json({ message: 'Profile updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error updating profile', error: err });
  }
};

const deleteProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    await user.deleteOne();
    res.status(200).json({ message: 'Profile deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting profile', error: err });
  }
};

module.exports = {
  register,
  login,
  profile,
  updateProfile,
  deleteProfile,
  registerAdmin,
  loginAdmin,
};
