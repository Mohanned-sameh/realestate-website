const roleMiddleware = (requiredRole) => async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).populate('role');
    if (!user || user.role.role !== requiredRole) {
      return res.status(403).json({ msg: 'Access denied' });
    }
    next();
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

module.exports = roleMiddleware;
