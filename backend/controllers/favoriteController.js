const Favorite = require('../models/Favorite');
const Property = require('../models/Property');
const User = require('../models/User');

const getFavorites = async (req, res) => {
  try {
    const favorites = await Favorite.find({ user: req.user._id }).populate(
      'property'
    );
    res.json(favorites);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addFavorite = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }
    const favorite = new Favorite({
      user: req.user._id,
      property: property._id,
    });
    await favorite.save();
    res.status(201).json(favorite);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteFavorite = async (req, res) => {
  try {
    const favorite = await Favorite.findOne({
      user: req.user._id,
      property: req.params.id,
    });
    if (!favorite) {
      return res.status(404).json({ message: 'Favorite not found' });
    }
    await favorite.remove();
    res.json({ message: 'Favorite removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getFavorites, addFavorite, deleteFavorite };
