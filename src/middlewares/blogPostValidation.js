const { getAllCategories } = require('../services/categoryService');
const { getAllBlogPost } = require('../services/blogPostService');
 
 const blogPostBodyCompleteValidation = (req, res, next) => {
    const { title, content, categoryIds } = req.body;
    if (!title || !content || !categoryIds) {
        return res.status(400).json({ message: 'Some required fields are missing' });
    }
     next();
 };

 const blogPostCategoryValidation = async (req, res, next) => {
  const { categoryIds } = req.body;
  const allCategoriesId = await getAllCategories();
  const vectorValidation = allCategoriesId.map((item) => categoryIds.includes(item.id));
 if (vectorValidation.includes(false)) {
     return res.status(400).json({ message: '"categoryIds" not found' });
 }
     next();
 };

 const blogPostByIdValidation = async (req, res, next) => {
    const { id } = req.params;
    const allBlogPost = await getAllBlogPost();
    const Validation = allBlogPost.some((item) => item.id === Number(id));
   if (Validation === false) {
       return res.status(404).json({ message: 'Post does not exist' });
   }
       next();
   };

module.exports = { 
    blogPostBodyCompleteValidation,
    blogPostCategoryValidation,
    blogPostByIdValidation,
}; 