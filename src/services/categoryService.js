const { Category } = require('../database/models');

const createCategory = async (name) => {
    const newCategory = await Category.create({ name });
    return newCategory;
};

const getAllCategories = async () => {
    const usersAllData = await Category.findAll();
    return usersAllData;
};

module.exports = {
    createCategory,
    getAllCategories,
};
