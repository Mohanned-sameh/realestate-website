const blog = require('../models/BlogPost');

exports.getBlogPosts = async (req, res) => {
  try {
    const posts = await blog.find();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getBlogPost = async (req, res) => {
  try {
    const post = await blog.findById(req.params.id);
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createBlogPost = async (req, res) => {
  const newPost = new blog(req.body);
  try {
    const post = await newPost.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateBlogPost = async (req, res) => {
  try {
    const post = await blog.findById(req.params.id);
    if (req.body.title) {
      post.title = req.body.title;
    }
    if (req.body.content) {
      post.content = req.body.content;
    }
    const updatedPost = await post.save();
    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteBlogPost = async (req, res) => {
  try {
    const post = await blog.findById(req.params.id);
    await post.remove();
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
