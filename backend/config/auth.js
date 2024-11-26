const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const secret = process.env.JWT_SECRET;
const expiresIn = '1d';

const generateToken = (user) => {
  return jwt.sign({ id: user.id }, secret, { expiresIn });
};

const verifyToken = (token) => {
  return jwt.verify(token, secret);
};

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

const comparePassword = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};

module.exports = {
  generateToken,
  verifyToken,
  hashPassword,
  comparePassword,
};
