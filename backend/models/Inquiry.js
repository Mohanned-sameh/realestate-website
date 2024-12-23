const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InquirySchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    message: { type: String, required: true },
    property: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'properties',
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = Inquiry = mongoose.model('inquiries', InquirySchema);
