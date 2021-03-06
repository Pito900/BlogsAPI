const Sequelize = require('sequelize');

const { Op } = Sequelize; // operadores
const { BlogPost, User, Category } = require('../database/models');
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

const getAllBlogPost = async () => {
    const allBlogPost = await BlogPost.findAll({
        include: [
            { model: User, as: 'user', attributes: { exclude: ['password'] } }, // p as: user tem q ter o mesmo nome do associate!
            { model: Category, as: 'categories' },
        ],
    });
    return allBlogPost;
};

const getBlogPostById = async (id) => {
    const blogPostId = await BlogPost.findOne({
        where: { id },
        include: [
            { model: User, as: 'user', attributes: { exclude: ['password'] } }, // p as: user tem q ter o mesmo nome do associate!
            { model: Category, as: 'categories' },
        ],
    });
    
    return blogPostId;
};

const updateBlogPost = async (req) => {
    const { title, content } = req.body;
    const { id } = req.params;
    await BlogPost.update(
        { title, content, updated: new Date() }, // aqui estou fazendo o update
        { where: { id } },
    );
    const blogPostUpdated = getBlogPostById(id);
    return blogPostUpdated;
};

const deleteBlogPost = async (id) => {
    await BlogPost.destroy(
        { where: { id } },
    );
};

const searchBlogPost = async (q) => { // ver esse link...https://www.codegrepper.com/code-examples/javascript/sequelize+like+search
    const allBlogPostIncludingQ = await BlogPost.findAll({ 
        where: {
            [Op.or]: [
                { title: { [Op.like]: `%${q}%` } },
                { content: { [Op.like]: `%${q}%` },
            }],
        },
        include: [
            { model: User, as: 'user', attributes: { exclude: ['password'] } }, // p as: user tem q ter o mesmo nome do associate!
            { model: Category, as: 'categories' },
        ],
    }); 
    return allBlogPostIncludingQ;
};

module.exports = {
    createBlogPost,
    getAllBlogPost,
    getBlogPostById,
    updateBlogPost,
    deleteBlogPost,
    searchBlogPost,
};