const Appointment = require('../models/appointmentModel');
const User = require('../models/userModel');
const Property = require('../models/propertyModel');

exports.getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.status(200).json({
      status: 'success',
      results: appointments.length,
      data: {
        appointments,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: {
        appointment,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.createAppointment = async (req, res) => {
  try {
    const { propertyId, userId } = req.body;
    const property = await Property.findById(propertyId);
    const user = await User.findById(userId);
    if (!property || !user) {
      return res.status(404).json({
        status: 'fail',
        message: 'Property or User not found',
      });
    }
    const appointment = await Appointment.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        appointment,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};

exports.updateAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(req.params.id);
    res.status(200).json({
      status: 'success',
      data: {
        appointment,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.deleteAppointment = async (req, res) => {
  try {
    await Appointment.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};
