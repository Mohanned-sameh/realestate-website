const Appointment = require('../models/appointmentModel');
const User = require('../models/userModel');
const Property = require('../models/propertyModel');
const { asyncHandler } = require('../middleware/asyncHandler');

// Create a new appointment
exports.createAppointment = asyncHandler(async (req, res) => {
  const { user, property, date, time } = req.body;

  // Check if the user exists
  const userObj = await User.findById(user);
  if (!userObj) {
    return res.status(400).json({ message: 'User not found' });
  }

  // Check if the property exists
  const propertyObj = await Property.findById(property);
  if (!propertyObj) {
    return res.status(400).json({ message: 'Property not found' });
  }

  // Create the appointment
  const newAppointment = await Appointment.create({
    user,
    property,
    date,
    time,
  });

  res.status(201).json({
    status: 'success',
    data: {
      appointment: newAppointment,
    },
  });
});

// Get all appointments
exports.getAppointments = asyncHandler(async (req, res) => {
  const appointments = await Appointment.find().populate('user property');

  res.status(200).json({
    status: 'success',
    data: {
      appointments,
    },
  });
});

// Get a single appointment by ID
exports.getAppointment = asyncHandler(async (req, res) => {
  const appointment = await Appointment.findById(req.params.id).populate(
    'user property'
  );
  if (!appointment) {
    return res.status(404).json({ message: 'Appointment not found' });
  }

  res.status(200).json({
    status: 'success',
    data: {
      appointment,
    },
  });
});

// Update an appointment
exports.updateAppointment = asyncHandler(async (req, res) => {
  const { user, property, date, time } = req.body;

  // Check if the user exists
  const userObj = await User.findById(user);
  if (!userObj) {
    return res.status(400).json({ message: 'User not found' });
  }

  // Check if the property exists
  const propertyObj = await Property.findById(property);
  if (!propertyObj) {
    return res.status(400).json({ message: 'Property not found' });
  }

  const appointment = await Appointment.findById(req.params.id);
  if (!appointment) {
    return res.status(404).json({ message: 'Appointment not found' });
  }

  const updatedAppointment = await Appointment.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    status: 'success',
    data: {
      appointment: updatedAppointment,
    },
  });
});

// Delete an appointment
exports.deleteAppointment = asyncHandler(async (req, res) => {
  const appointment = await Appointment.findById(req.params.id);
  if (!appointment) {
    return res.status(404).json({ message: 'Appointment not found' });
  }

  await appointment.remove();

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
