const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PropertySchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    location: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point',
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        required: true,
      },
    },
    type: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'propertyTypes',
      required: true,
    },
    bedrooms: { type: Number, required: true },
    bathrooms: { type: Number, required: true },
    area: { type: Number, required: true },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    images: [{ type: String }], // URLs of images hosted on cloud
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
    views: {
      type: Number,
      default: 0,
    },
    features: {
      type: [String], // e.g., ['pool', 'garden']
    },
  },
  { timestamps: true }
);

// Create a geospatial index for the location field
PropertySchema.index({ location: '2dsphere' });

module.exports = Property = mongoose.model('properties', PropertySchema);
