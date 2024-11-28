const express = require('express');
const {
  getBlogsPosts,
  getBlogPostById,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
} = require('../controllers/blogController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');
const router = express.Router();

router
  .route('/')
  .get(getBlogsPosts)
  .post(authMiddleware, adminMiddleware, createBlogPost);

router
  .route('/:id')
  .get(getBlogPostById)
  .put(authMiddleware, adminMiddleware, updateBlogPost)
  .delete(authMiddleware, adminMiddleware, deleteBlogPost);

module.exports = router;
