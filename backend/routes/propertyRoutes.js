const express = require('express');
const {
  getProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty,
} = require('../controllers/propertyController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', getProperties);
router.get('/:id', getPropertyById);
router.post('/create', authMiddleware, createProperty);
router.put('/update/:id', authMiddleware, updateProperty);
router.delete('/delete/:id', authMiddleware, deleteProperty);

module.exports = router;
