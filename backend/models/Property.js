const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    location: { type: String, required: true },
    developerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    propertyType: {
      type: String,
      enum: ['apartment', 'villa', 'office', 'shop'],
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ['cash', 'installments'],
      required: true,
    },
    area: { type: Number, required: true },
    bedrooms: { type: Number, required: true },
    bathrooms: { type: Number, required: true },
    images: [{ type: String, default: [] }],
    status: {
      type: String,
      enum: ['available', 'sold'],
      default: 'available',
    },
    forRent: { type: Boolean, default: false },
    forSale: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Property', propertySchema);
