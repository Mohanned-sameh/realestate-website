const adminMiddleware = (req, res, next) => {
  if (req.user.accountType !== 'admin' || req.user.accountType !== 'agent') {
    return res.status(403).json({ message: 'Access denied' });
  }
  next();
};

module.exports = adminMiddleware;
