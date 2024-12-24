const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Role = require('../models/roleModel');
const { asyncHandler } = require('../middleware/asyncHandler');
const { validateObjectId } = require('../middleware/asyncHandler');

// Register a new user
exports.registerUser = asyncHandler(async (req, res) => {
  const { firstname, lastName, email, password, phone, role } = req.body;

  // Check if the user already exists
  const user = await User.findOne({ email });
  if (user) {
    return res.status(400).json({ message: 'User already exists' });
  }

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Find the role
  const roleObj = await Role.findOne({ name: role });
  if (!roleObj) {
    return res.status(400).json({ message: 'Role does not exist' });
  }

  // Create the user
  const newUser = await User.create({
    firstname,
    lastName,
    email,
    password: hashedPassword,
    phone,
    role: roleObj._id,
  });

  // Generate a token
  const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });

  res.status(201).json({
    status: 'success',
    data: {
      user: newUser,
      token,
    },
  });
});

exports.registerAdmin = asyncHandler(async (req, res) => {
  const { firstname, lastName, email, password, phone, role } = req.body;

  // Check if the user already exists
  const user = await User.findOne({ email });
  if (user) {
    return res.status(400).json({ message: 'User already exists' });
  }

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Find the role
  const roleObj = await Role.findOne({ name: role });
  if (!roleObj) {
    return res.status(400).json({ message: 'Role does not exist' });
  }

  // Create the user
  const newUser = await User.create({
    firstname,
    lastName,
    email,
    password: hashedPassword,
    phone,
    role: roleObj._id,
  });

  // Generate a token
  const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });

  res.status(201).json({
    status: 'success',
    data: {
      user: newUser,
      token,
    },
  });
});

// Login a user
exports.loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check if the user exists
  const user = await User.findOne({ email }).populate('role');
  if (!user) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  // Check if the password is correct
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  // Generate a token
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });

  res.status(200).json({
    status: 'success',
    data: {
      user,
      token,
    },
  });
});

// Get all users
exports.getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().populate('role');
  res.status(200).json({
    status: 'success',
    data: {
      users,
    },
  });
});

// Get a single user by ID
exports.getUser = asyncHandler(async (req, res) => {
  if (!validateObjectId(req.params.id)) {
    return res.status(400).json({ message: 'Invalid ID' });
  }
  const user = await User.findById(req.params.id).populate('role');
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

// Update a user
exports.updateUser = asyncHandler(async (req, res) => {
  if (!validateObjectId(req.params.id)) {
    return res.status(400).json({ message: 'Invalid ID' });
  }
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  const updatedUer = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: 'success',
    data,
  });
});

// Delete a user
exports.deleteUser = asyncHandler(async (req, res) => {
  if (!validateObjectId(req.params.id)) {
    return res.status(400).json({ message: 'Invalid ID' });
  }
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  await User.findByIdAndDelete(req.params.id);
  res.status(204).json({
    status: 'success',
    data: null,
  });
});

// Get the current user
exports.getCurrentUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).populate('role');
  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});
