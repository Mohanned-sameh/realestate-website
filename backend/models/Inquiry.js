const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InquirySchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    message: { type: String, required: true },
    property: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'properties',
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
    }, // Optional, for logged-in users
  },
  { timestamps: true }
);

module.exports = Inquiry = mongoose.model('inquiries', InquirySchema);
