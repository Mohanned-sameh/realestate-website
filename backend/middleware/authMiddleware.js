const jsonwebtoken = require('jsonwebtoken');
const jwt_secret = process.env.JWT_SECRET;

module.exports = (req, res, next) => {
  const token = req.header('token');
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }
  try {
    const decoded = jsonwebtoken.verify(token, jwt_secret);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
