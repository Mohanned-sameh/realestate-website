const express = require('express');
const appointmentController = require('../controllers/appointmentController');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');
const router = express.Router();

router.get(
  '/',
  adminMiddleware,
  authMiddleware,
  appointmentController.getAllAppointments
);
router.get(
  '/:id',
  adminMiddleware,
  authMiddleware,
  appointmentController.getAppointment
);

router.post('/', authMiddleware, appointmentController.createAppointment);

router.patch(
  '/:id',
  adminMiddleware,
  authMiddleware,
  appointmentController.updateAppointment
);

router.delete(
  '/:id',
  adminMiddleware,
  authMiddleware,
  appointmentController.deleteAppointment
);

module.exports = router;
