const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    location: {
      type: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true },
      },
      required: true,
    },
    developerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    propertyTypeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'PropertyType',
      required: true,
    },
    area: { type: Number, required: true, min: 0 },
    bedrooms: { type: Number, required: true, min: 0 },
    bathrooms: { type: Number, required: true, min: 0 },
    images: { type: [String], default: [] },
    status: {
      type: String,
      enum: ['available', 'sold', 'rented'],
      default: 'available',
    },
    forRent: { type: Boolean, default: false },
    forSale: { type: Boolean, default: false },
    paymentMethod: {
      type: String,
      enum: ['cash', 'installments'],
      required: true,
    },
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Favorite' }],
  },
  {
    timestamps: true,
  }
);

// Adding indexes for optimized queries
propertySchema.index({ location: 1 });
propertySchema.index({ developerId: 1, status: 1 });

module.exports = mongoose.model('Property', propertySchema);
