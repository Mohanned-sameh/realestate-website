const Property = require('../models/Property');
const PropertyType = require('../models/PropertyType');

// Get all properties
exports.getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find().populate('type seller');
    res.status(200).json({
      status: 'success',
      results: properties.length,
      data: {
        properties,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

// Get a single property by ID
exports.getProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id).populate(
      'type seller'
    );
    if (!property) {
      return res
        .status(404)
        .json({ status: 'fail', message: 'Property not found' });
    }
    res.status(200).json({
      status: 'success',
      data: {
        property,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

// Create a new property
exports.createProperty = async (req, res) => {
  try {
    const propertyType = await PropertyType.findById(req.body.type);
    if (!propertyType) {
      return res
        .status(404)
        .json({ status: 'fail', message: 'Property type not found' });
    }

    const newProperty = await Property.create(req.body);
    propertyType.properties.push(newProperty._id);
    await propertyType.save();

    res.status(201).json({
      status: 'success',
      data: {
        property: newProperty,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

// Update a property by ID
exports.updateProperty = async (req, res) => {
  try {
    const property = await Property.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!property) {
      return res
        .status(404)
        .json({ status: 'fail', message: 'Property not found' });
    }

    res.status(200).json({
      status: 'success',
      data: {
        property,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

// Delete a property by ID
exports.deleteProperty = async (req, res) => {
  try {
    const property = await Property.findByIdAndDelete(req.params.id);
    if (!property) {
      return res
        .status(404)
        .json({ status: 'fail', message: 'Property not found' });
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
