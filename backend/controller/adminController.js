const User = require('../models/User');
const Roles = require('../models/Roles');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwt_secret = process.env.JWT_SECRET;
const { validationResult } = require('express-validator');

exports.register = async (req, res) => {
  const { firstName, lastName, phone, email, password } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }
    user = new User({
      firstName,
      lastName,
      phone,
      email,
      role: 'admin',
    });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();
    res.status(200).json({ msg: 'User registered successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }
    const payload = {
      user: {
        id: user.id,
      },
    };
    jwt.sign(payload, jwt_secret, { expiresIn: 3600 }, (err, token) => {
      if (err) throw err;
      res.status(200).json({ token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.addRole = async (req, res) => {
  try {
    const { role } = req.body;
    const roleExists = await Roles.findOne({ role });
    if (roleExists) {
      return res.status(400).json({ msg: 'Role already exists' });
    }
    const newRole = new Roles({
      role,
    });
    await newRole.save();
    res.status(200).json({ msg: 'Role added successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

exports.getRoles = async (req, res) => {
  try {
    const roles = await Roles.find();
    res.status(200).json(roles);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

exports.updateRole = async (req, res) => {
  try {
    const { role } = req.body;
    const roleExists = await Roles.findOne({ role });
    if (roleExists) {
      return res.status(400).json({ msg: 'Role already exists' });
    }
    const updatedRole = await Roles.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({ msg: 'Role updated successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

exports.getRoleById = async (req, res) => {
  try {
    const role = await Roles.findById(req.params.id);
    res.status(200).json(role);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

exports.deleteRole = async (req, res) => {
  try {
    await Roles.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: 'Role deleted successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json(users);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};
