const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PropertyTypesSchema = new Schema(
  {
    type: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = PropertyTypes = mongoose.model(
  'propertyTypes',
  PropertyTypesSchema
);
