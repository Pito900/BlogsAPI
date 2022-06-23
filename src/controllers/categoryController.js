const express = require('express');
const { createCategory, getAllCategories } = require('../services/categoryService');

const route = express.Router();

const createCategoryController = async (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ message: '"name" is required' });
    }
    try {
        const newCategory = await createCategory(name);
        return res.status(201).json(newCategory);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    } 
};

const getAllCategoriesController = async (_req, res) => {
    try {
        const allCategories = await getAllCategories();
        return res.status(200).json(allCategories);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    } 
};

module.exports = {
    route,
    createCategoryController,
    getAllCategoriesController,
};