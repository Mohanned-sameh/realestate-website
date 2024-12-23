const express = require('express');
const {
  getAllPropertyTypes,
  getPropertyType,
  createPropertyType,
} = require('../controller/propertyTypeController');
const adminMiddleware = require('../middleware/adminMiddleware');
const authMiddleware = require('../middleware/authMiddleware');
const { check } = require('express-validator');

const router = express.Router();

router.get('/', getAllPropertyTypes);
router.get('/:id', getPropertyType);
router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('description', 'Description is required').not().isEmpty(),
  ],
  authMiddleware,
  adminMiddleware,
  createPropertyType
);
router.put('/:id', authMiddleware, adminMiddleware, updatePropertyType);
router.delete('/:id', authMiddleware, adminMiddleware, deletePropertyType);

module.exports = router;
