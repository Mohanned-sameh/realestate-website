const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PropertySchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    location: { type: String, required: true },
    longitude: { type: Number, required: true },
    latitude: { type: Number, required: true },
    type: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'propertyTypes',
      required: true,
    },
    bedrooms: { type: Number, required: true },
    bathrooms: { type: Number, required: true },
    area: { type: Number, required: true }, // in square meters or square feet
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    }, // Refers to seller or agent
    images: [{ type: String }], // URLs of images hosted on cloud (Cloudinary, for example)
    status: {
      type: String,
      enum: ['available', 'sold', 'rented'],
      default: 'available',
    },
    rentOrSale: {
      type: String,
      enum: ['rent', 'sale'],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = Property = mongoose.model('properties', PropertySchema);
