const router = require('express').Router();
const {
  registerUser,
  loginUser,
  registerAdmin,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  getAllUsers,
  getCurrentUser,
} = require('../controller/authController');
const {
  adminMiddleware,
  authMiddleware,
} = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/register-admin', registerAdmin);
router.get('/users', authMiddleware, adminMiddleware, getAllUsers);
router.get('/users/me', authMiddleware, getCurrentUser);
router.get('/users/:id', authMiddleware, adminMiddleware, getUser);
router.put('/users/me/:id', authMiddleware, updateUser);
router.delete('/users/me/:id', authMiddleware, deleteUser);

module.exports = router;
