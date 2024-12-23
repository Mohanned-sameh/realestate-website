const express = require('express');
const propertyController = require('../controllers/propertyController');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');
const { check } = require('express-validator');
const router = express.Router();

router.get('/', propertyController.getAllProperties);
router.get('/:id', propertyController.getProperty);
router.post(
  '/',
  [
    check('title', 'Title is required').not().isEmpty(),
    check('location', 'Location is required').not().isEmpty(),
    check('price', 'Price is required').not().isEmpty(),
    check('description', 'Description is required').not().isEmpty(),
    check('longitude', 'Longitude is required').not().isEmpty(),
    check('latitude', 'Latitude is required').not().isEmpty(),
    check('type', 'Type is required').not().isEmpty(),
    check('bedrooms', 'Bedrooms is required').not().isEmpty(),
    check('bathrooms', 'Bathrooms is required').not().isEmpty(),
    check('area', 'Area is required').not().isEmpty(),
    check('seller', 'Seller is required').not().isEmpty(),
    check('images', 'Images is required').not().isEmpty(),
    check('status', 'Status is required').not().isEmpty(),
    check('rentOrSale', 'Rent or Sale is required').not().isEmpty(),
  ],
  authMiddleware,
  adminMiddleware,
  propertyController.createProperty
);

router.patch(
  '/:id',
  [
    check('title', 'Title is required').not().isEmpty(),
    check('location', 'Location is required').not().isEmpty(),
    check('price', 'Price is required').not().isEmpty(),
    check('description', 'Description is required').not().isEmpty(),
    check('longitude', 'Longitude is required').not().isEmpty(),
    check('latitude', 'Latitude is required').not().isEmpty(),
    check('type', 'Type is required').not().isEmpty(),
    check('bedrooms', 'Bedrooms is required').not().isEmpty(),
    check('bathrooms', 'Bathrooms is required').not().isEmpty(),
    check('area', 'Area is required').not().isEmpty(),
    check('seller', 'Seller is required').not().isEmpty(),
    check('images', 'Images is required').not().isEmpty(),
    check('status', 'Status is required').not().isEmpty(),
    check('rentOrSale', 'Rent or Sale is required').not().isEmpty(),
  ],
  authMiddleware,
  adminMiddleware,
  propertyController.updateProperty
);
router.delete(
  '/:id',
  authMiddleware,
  adminMiddleware,
  propertyController.deleteProperty
);

module.exports = router;
