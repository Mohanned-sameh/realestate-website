const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RolesSchema = new Schema(
  {
    role: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = Roles = mongoose.model('roles', RolesSchema);
