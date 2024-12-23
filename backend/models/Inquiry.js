const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InquirySchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: { type: String, required: true },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = Inquiry = mongoose.model('inquiries', InquirySchema);
