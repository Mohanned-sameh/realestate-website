const PropertyType = require('../models/PropertyType');

// Get all property types
exports.getAllPropertyTypes = async (req, res) => {
  try {
    const propertyTypes = await PropertyType.find().populate('properties');
    res.status(200).json({
      status: 'success',
      results: propertyTypes.length,
      data: {
        propertyTypes,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

// Get a single property type by ID
exports.getPropertyType = async (req, res) => {
  try {
    const propertyType = await PropertyType.findById(req.params.id).populate(
      'properties'
    );
    if (!propertyType) {
      return res
        .status(404)
        .json({ status: 'fail', message: 'Property type not found' });
    }
    res.status(200).json({
      status: 'success',
      data: {
        propertyType,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

// Create a new property type
exports.createPropertyType = async (req, res) => {
  try {
    const newPropertyType = await PropertyType.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        propertyType: newPropertyType,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

// Update a property type by ID
exports.updatePropertyType = async (req, res) => {
  try {
    const propertyType = await PropertyType.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!propertyType) {
      return res
        .status(404)
        .json({ status: 'fail', message: 'Property type not found' });
    }

    res.status(200).json({
      status: 'success',
      data: {
        propertyType,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

// Delete a property type by ID
exports.deletePropertyType = async (req, res) => {
  try {
    const propertyType = await PropertyType.findByIdAndDelete(req.params.id);
    if (!propertyType) {
      return res
        .status(404)
        .json({ status: 'fail', message: 'Property type not found' });
    }

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};
