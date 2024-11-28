const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContactusSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      RegExp: '^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$',
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
