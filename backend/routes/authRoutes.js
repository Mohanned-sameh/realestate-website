const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const authController = require('../controller/authController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

// Public Routes
router.post(
  '/register',
  [
    check('firstName', 'First Name is required').not().isEmpty(),
    check('lastName', 'Last Name is required').not().isEmpty(),
    check('phone', 'Phone is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 8–20 characters, including at least one letter and one number'
    ).matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/),
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

// Protected Routes (User)
router.get('/user', authMiddleware, authController.getUser);
router.put('/user', authMiddleware, authController.updateUser);
router.delete('/user', authMiddleware, authController.deleteUser);

// Protected Routes (Admin)
router.post(
  '/admin/register',
  authMiddleware,
  roleMiddleware('admin'),
  [
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 8–20 characters, including at least one letter and one number'
    ).matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/),
  ],
  authController.register
);

router.get(
  '/admin/users',
  authMiddleware,
  roleMiddleware('admin'),
  adminController.getUsers
);
router.put(
  '/admin/users/:id',
  authMiddleware,
  roleMiddleware('admin'),
  adminController.updateUser
);
router.delete(
  '/admin/users/:id',
  authMiddleware,
  roleMiddleware('admin'),
  adminController.deleteUser
);

module.exports = router;
