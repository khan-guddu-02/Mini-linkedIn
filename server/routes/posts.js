const express = require('express');
const Post = require('../models/Post');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Create Post
router.post('/', async (req, res) => {
  const { token, content } = req.body;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const post = await Post.create({ content, author: decoded.id });
    res.json(post);
  } catch (err) {
    res.status(400).json({ error: 'Invalid token' });
  }
});

// Get all posts
router.get('/', async (req, res) => {
  const posts = await Post.find().populate('author', 'name').sort({ createdAt: -1 });
  res.json(posts);
});

// Get user’s posts
router.get('/user/:id', async (req, res) => {
  const posts = await Post.find({ author: req.params.id }).populate('author', 'name');
  res.json(posts);
});

module.exports = router;