const express = require('express');
const {
  getAllProperties,
  getProperty,
  createProperty,
  updateProperty,
  deleteProperty,
} = require('../controller/propertyController');
const {
  adminMiddleware,
  authMiddleware,
} = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/properties', getAllProperties);
router.get('/properties/:id', getProperty);
router.post('/properties', authMiddleware, adminMiddleware, createProperty);
router.put('/properties/:id', authMiddleware, adminMiddleware, updateProperty);
router.delete(
  '/properties/:id',
  authMiddleware,
  adminMiddleware,
  deleteProperty
);

module.exports = router;
