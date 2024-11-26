const express = require('express');
const router = express.Router();
const {
  login,
  register,
  deleteProfile,
  getProfile,
  updateProfile,
} = require('../controller.js/authController');

router.post('/register', register);
router.post('/login', login);
router.get('/profile', getProfile);
router.put('/profile', updateProfile);
router.delete('/profile', deleteProfile);

module.exports = router;
