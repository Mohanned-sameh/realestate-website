const blog = require('../models/BlogPost');

const getBlogsPosts = async (req, res) => {
  const pagination = req.query.pagination || 10;
  const page = req.query.page || 1;
  try {
    const blogs = await blog
      .find()
      .limit(pagination * 1)
      .skip((page - 1) * pagination);
    res.json(blogs);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

const getBlogPostById = async (req, res) => {
  try {
    const blogPost = await blog.findById(req.params.id);
    if (blogPost) {
      res.json(blogPost);
    } else {
      res.status(404).send('Blog not found');
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

const createBlogPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const newBlog = new blog({
      title,
      content,
    });
    const savedBlog = await newBlog.save();
    res.json(savedBlog);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

const updateBlogPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const blogPost = await blog.findById(req.params.id);
    if (blogPost) {
      blogPost.title = title;
      blogPost.content = content;
      const updatedBlog = await blogPost.save();
      res.json(updatedBlog);
    } else {
      res.status(404).send('Blog not found');
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

const deleteBlogPost = async (req, res) => {
  try {
    const blogPost = await blog.findById(req.params.id);
    if (blogPost) {
      await blogPost.remove();
      res.json({ message: 'Blog deleted' });
    } else {
      res.status(404).send('Blog not found');
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

module.exports = {
  getBlogsPosts,
  getBlogPostById,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
};
