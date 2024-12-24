const router = require('express').Router();
const {
  createAppointment,
  deleteAppointment,
  getAppointments,
  getAppointment,
  updateAppointment,
} = require('../controller/appointmentController');
const {
  authMiddleware,
  adminMiddleware,
} = require('../middleware/authMiddleware');

router.post('/appointments', authMiddleware, createAppointment);
router.get('/appointments', authMiddleware, adminMiddleware, getAppointments);
router.get('/appointments/:id', authMiddleware, getAppointment);
router.put('/appointments/:id', authMiddleware, updateAppointment);
router.delete('/appointments/:id', authMiddleware, deleteAppointment);

module.exports = router;
