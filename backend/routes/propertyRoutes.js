const express = require('express');
const {
  getProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty,
} = require('../controllers/propertyController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');
const router = express.Router();

router.get('/', getProperties);
router.get('/:id', getPropertyById);
router.post('/create', authMiddleware, adminMiddleware, createProperty);
router.put('/update/:id', authMiddleware, adminMiddleware, updateProperty);
router.delete('/delete/:id', authMiddleware, adminMiddleware, deleteProperty);

module.exports = router;
