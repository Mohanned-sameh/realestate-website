const Property = require('../models/Property');
const upload = require('../middleware/multerMiddleware');

// Get all properties
const getProperties = async (req, res) => {
  try {
    const properties = await Property.find()
      .populate('developerId', 'name logo') // Populate developer details
      .populate('propertyTypeId', 'name'); // Populate property type
    res.status(200).json(properties);
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Error retrieving properties', error: err });
  }
};

// Get a single property by ID
const getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id)
      .populate('developerId', 'name logo')
      .populate('propertyTypeId', 'name');
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }
    res.status(200).json(property);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving property', error: err });
  }
};

// Create a new property
const createProperty = (req, res) => {
  upload.array('images', 5)(req, res, async (err) => {
    if (err) {
      return res
        .status(400)
        .json({ message: 'Image upload failed', error: err });
    }

    try {
      const images = req.files.map((file) => file.path); // Get file paths
      const {
        title,
        description,
        price,
        location, // Pass as JSON string in the request body
        developerId,
        propertyTypeId,
        area,
        bedrooms,
        bathrooms,
        status,
        forRent,
        forSale,
        paymentMethod,
      } = req.body;

      const property = new Property({
        title,
        description,
        price,
        location: JSON.parse(location), // Convert location back to object
        developerId,
        propertyTypeId,
        area,
        bedrooms,
        bathrooms,
        images,
        status,
        forRent,
        forSale,
        paymentMethod,
      });

      await property.save();
      res
        .status(201)
        .json({ message: 'Property created successfully', property });
    } catch (error) {
      res.status(500).json({ message: 'Error creating property', error });
    }
  });
};

// Update an existing property
const updateProperty = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      location,
      developerId,
      propertyTypeId,
      area,
      bedrooms,
      bathrooms,
      status,
      forRent,
      forSale,
      paymentMethod,
    } = req.body;

    const updatedData = {
      title,
      description,
      price,
      location: location ? JSON.parse(location) : undefined, // Optional update
      developerId,
      propertyTypeId,
      area,
      bedrooms,
      bathrooms,
      status,
      forRent,
      forSale,
      paymentMethod,
    };

    // Remove undefined fields
    Object.keys(updatedData).forEach(
      (key) => updatedData[key] === undefined && delete updatedData[key]
    );

    const property = await Property.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    res
      .status(200)
      .json({ message: 'Property updated successfully', property });
  } catch (err) {
    res.status(500).json({ message: 'Error updating property', error: err });
  }
};

// Delete a property
const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findByIdAndDelete(req.params.id);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }
    res.status(200).json({ message: 'Property deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting property', error: err });
  }
};

module.exports = {
  getProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty,
};
