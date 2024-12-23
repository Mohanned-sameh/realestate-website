const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const authController = require('../controller/authController');
const authMiddleware = require('../middleware/authMiddleware');
const adminController = require('../controller/adminController');

// User routes
router.get('/user', authMiddleware, authController.getUser);
router.post(
  '/register',
  [
    check('firstName', 'First Name is required').not().isEmpty(),
    check('lastName', 'Last Name is required').not().isEmpty(),
    check('phone', 'Phone is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({
      min: 6,
    }),
  ],
  authController.register
);

router.post(
  '/login',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  authController.login
);

router.put(
  '/user',
  authMiddleware,
  [
    check('firstName', 'First Name is required').not().isEmpty(),
    check('lastName', 'Last Name is required').not().isEmpty(),
    check('phone', 'Phone is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({
      min: 6,
    }),
  ],
  authController.updateUser
);
router.delete('/user', authMiddleware, authController.deleteUser);

// Admin routes
router.post(
  '/admin/register',
  authMiddleware,
  [
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({
      min: 6,
    }),
  ],
  authMiddleware,
  adminController.register
);

router.post('/admin/login', adminController.login);

router.put(
  '/admin/user',
  authMiddleware,
  [
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({
      min: 6,
    }),
  ],
  authMiddleware,
  adminController.updateUser
);
router.delete('/admin/user', authMiddleware, adminController.deleteUser);
module.exports = router;
