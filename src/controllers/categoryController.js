const express = require('express');
const { createCategory } = require('../services/categoryService');

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

module.exports = {
    route,
    createCategoryController,
};