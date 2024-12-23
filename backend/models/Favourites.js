const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FavouritesSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    property: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'properties',
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = Favourites = mongoose.model('favourites', FavouritesSchema);
