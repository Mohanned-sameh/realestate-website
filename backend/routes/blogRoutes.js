const express = require('express');
const router = express.Router();
const {
  getBlogPost,
  createBlogPost,
  deleteBlogPost,
  getBlogPosts,
  updateBlogPost,
} = require('../controllers/blogController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

router.get('/', getBlogPosts);
router.get('/:id', getBlogPost);
router.post('/', authMiddleware, adminMiddleware, createBlogPost);
router.put('/:id', authMiddleware, adminMiddleware, updateBlogPost);
router.delete('/:id', authMiddleware, adminMiddleware, deleteBlogPost);

module.exports = router;
