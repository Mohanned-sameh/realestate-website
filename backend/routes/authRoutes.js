// routes/authRoutes.js
const express = require('express');
const {
  register,
  login,
  profile,
  deleteProfile,
  updateProfile,
  loginAdmin,
  registerAdmin,
} = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');
const router = express.Router();

// User Routes
router.post('/register', register);
router.post('/login', login);
router.get('/profile', authMiddleware, profile);
router.put('/update', authMiddleware, updateProfile);
router.delete('/delete', authMiddleware, deleteProfile);

// Admin Routes
router.post('/admin/register', authMiddleware, adminMiddleware, registerAdmin);
router.post('/admin/login', loginAdmin);

module.exports = router;
