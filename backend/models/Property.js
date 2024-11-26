const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  location: { type: String, required: true },
  developerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  propertyType: {
    type: String,
    enum: ['residential', 'commercial'],
    required: true,
  },
  paymentMethod: {
    type: String,
    enum: ['cash', 'installments'],
    required: true,
  },
});

module.exports = mongoose.model('Property', propertySchema);
