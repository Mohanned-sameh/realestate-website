const express = require('express');
const {
  getAllProperties,
  getProperty,
  createProperty,
  updateProperty,
  deleteProperty,
} = require('../controller/propertyController');
const adminMiddleware = require('../middleware/adminMiddleware');
const authMiddleware = require('../middleware/authMiddleware');
const { check } = require('express-validator');

const router = express.Router();

router.get('/', getAllProperties);
router.get('/:id', getProperty);
router.post(
  '/',
  [
    check('title', 'Title is required').not().isEmpty(),
    check('description', 'Description is required').not().isEmpty(),
    check('price', 'Price is required').not().isEmpty(),
    check('location', 'Location is required').not().isEmpty(),
    check('longitude', 'Longitude is required').not().isEmpty(),
    check('latitude', 'Latitude is required').not().isEmpty(),
    check('type', 'Property type is required').not().isEmpty(),
    check('bedrooms', 'Number of bedrooms is required').not().isEmpty(),
    check('bathrooms', 'Number of bathrooms is required').not().isEmpty(),
    check('area', 'Area is required').not().isEmpty(),
    check('seller', 'Seller is required').not().isEmpty(),
    check('rentOrSale', 'Rent or sale is required').not().isEmpty(),
  ],
  authMiddleware,
  adminMiddleware,
  createProperty
);

router.put('/:id', authMiddleware, adminMiddleware, updateProperty);
router.delete('/:id', authMiddleware, adminMiddleware, deleteProperty);
module.exports = router;
