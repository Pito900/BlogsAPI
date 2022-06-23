const express = require('express');
const { createBlogPost } = require('../services/blogPostService');

const route = express.Router();

const createBlogPostController = async (req, res) => {
    try {
        const newBlogPost = await createBlogPost(req);
        return res.status(201).json(newBlogPost);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    } 
};

module.exports = {
    route,
    createBlogPostController,
};