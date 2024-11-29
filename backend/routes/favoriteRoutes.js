const router = require('express').Router();
const {
  getFavorites,
  addFavorite,
  deleteFavorite,
} = require('../controllers/favoriteController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, getFavorites);
router.post('/:id', authMiddleware, addFavorite);
router.delete('/:id', authMiddleware, deleteFavorite);

module.exports = router;
