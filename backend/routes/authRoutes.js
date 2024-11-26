// routes/authRoutes.js
const express = require('express');
const {
  register,
  login,
  profile,
  deleteProfile,
  updateProfile,
} = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/profile', authMiddleware, profile);
router.put('/update', authMiddleware, updateProfile);
router.delete('/delete', authMiddleware, deleteProfile);

module.exports = router;
