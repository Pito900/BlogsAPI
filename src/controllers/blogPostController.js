const express = require('express');
const { createBlogPost, getAllBlogPost } = require('../services/blogPostService');

const route = express.Router();

const createBlogPostController = async (req, res) => {
    try {
        const newBlogPost = await createBlogPost(req);
        return res.status(201).json(newBlogPost);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    } 
};

const getAllBlogPostController = async (_req, res) => {
    try {
        const allBlogPost = await getAllBlogPost();
        return res.status(200).json(allBlogPost);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    } 
};

module.exports = {
    route,
    createBlogPostController,
    getAllBlogPostController,
};