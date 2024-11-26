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
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/profile', authMiddleware, profile);
router.put('/update', authMiddleware, updateProfile);
router.delete('/delete', authMiddleware, deleteProfile);
router.post('/admin/register', adminMiddleware, registerAdmin);
router.post('/admin/login', loginAdmin);

module.exports = router;
