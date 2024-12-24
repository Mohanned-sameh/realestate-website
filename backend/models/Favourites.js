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

// Add a unique constraint for the user and property combination
FavouritesSchema.index({ user: 1, property: 1 }, { unique: true });

module.exports = Favourites = mongoose.model('favourites', FavouritesSchema);
