const express = require('express');
const { 
    createBlogPost,
    getAllBlogPost, 
    getBlogPostById, 
    updateBlogPost,
    deleteBlogPost,
 } = require('../services/blogPostService');

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

const getBlogPostByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const blogPostByiD = await getBlogPostById(id);
        return res.status(200).json(blogPostByiD);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    } 
};

const updateBlogPostController = async (req, res) => {
    try {
        const updatedBlogPost = await updateBlogPost(req);
        return res.status(200).json(updatedBlogPost);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    } 
};

const deleteBlogPostController = async (req, res) => {
    try {
        const { id } = req.params;
        await deleteBlogPost(id);
        return res.status(204).json();
    } catch (error) {
        return res.status(500).json({ message: error.message });
    } 
};

module.exports = {
    route,
    createBlogPostController,
    getAllBlogPostController,
    getBlogPostByIdController,
    updateBlogPostController,
    deleteBlogPostController,
};