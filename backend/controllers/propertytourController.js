const PropertyTourAppointment = require('../models/PropertyTourAppointment');

const createPropertyTourAppointment = async (req, res) => {
  try {
    const propertyTourAppointment = new PropertyTourAppointment({
      ...req.body,
      user: req.user._id,
    });
    await propertyTourAppointment.save();
    res.status(201).json({ propertyTourAppointment });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getPropertyTourAppointments = async (req, res) => {
  try {
    const propertyTourAppointments = await PropertyTourAppointment.find();
    res.json(propertyTourAppointments);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updatePropertyTourAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const propertyTourAppointment =
      await PropertyTourAppointment.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      });
    if (!propertyTourAppointment) {
      return res
        .status(404)
        .json({ error: 'PropertyTourAppointment not found' });
    }
    res.json(propertyTourAppointment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deletePropertyTourAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const propertyTourAppointment =
      await PropertyTourAppointment.findByIdAndDelete(id);
    if (!propertyTourAppointment) {
      return res
        .status(404)
        .json({ error: 'PropertyTourAppointment not found' });
    }
    res.json(propertyTourAppointment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createPropertyTourAppointment,
  getPropertyTourAppointments,
  updatePropertyTourAppointment,
  deletePropertyTourAppointment,
};
