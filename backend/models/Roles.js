const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RolesSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    }, // Optional description of the role
  },
  { timestamps: true }
);

module.exports = Roles = mongoose.model('roles', RolesSchema);
