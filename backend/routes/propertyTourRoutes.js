const express = require('express');
const router = express.Router();

const {
  createPropertyTourAppointment,
  getPropertyTourAppointments,
  updatePropertyTourAppointment,
  deletePropertyTourAppointment,
} = require('../controllers/propertyTourController');
const adminMiddleware = require('../middlewares/adminMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');

router
  .route('/')
  .post(authMiddleware, createPropertyTourAppointment)
  .get(authMiddleware, adminMiddleware, getPropertyTourAppointments);

router
  .route('/:id')
  .put(authMiddleware, adminMiddleware, updatePropertyTourAppointment)
  .delete(authMiddleware, adminMiddleware, deletePropertyTourAppointment);

module.exports = router;
