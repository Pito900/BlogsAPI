const Sequelize = require('sequelize');
const { BlogPost } = require('../database/models');
const { gettingIdFromToken } = require('./userService');

const config = require('../database/config/config');

const sequelize = new Sequelize(config.development);

const createBlogPost = async (req) => {
    const { title, content, categoryIds } = req.body;
    const { authorization } = req.headers;
    const userId = await gettingIdFromToken(authorization);
        const result = await sequelize.transaction(async (t) => {
            const newPost = await BlogPost.create({
                title,
                content,
                userId,
                updated: new Date(),
                published: new Date(),
            }, { transaction: t });
            await newPost.addCategories(categoryIds, { transaction: t });
            return newPost;
        });
        return result;
};

module.exports = {
    createBlogPost,
};