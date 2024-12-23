const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    },
    role: {
      type: Schema.Types.ObjectId,
      ref: 'roles',
      required: true,
    },
    phone: {
      type: String,
      required: true,
      pattern: /^[0-9]{10}$/,
    },
    password: {
      type: String,
      required: true,
      pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
      min: 8,
      max: 20,
    },
  },
  { timestamps: true }
);

module.exports = User = mongoose.model('users', UserSchema);
