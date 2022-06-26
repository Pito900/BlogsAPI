const { getAllCategories } = require('../services/categoryService');
const { getAllBlogPost } = require('../services/blogPostService');
const { getAllUsers } = require('../services/userService');
const { decodingToken } = require('../jwt/JWT');
 
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

   const blogPostUpdateBodyValidation = (req, res, next) => {
    const { title, content } = req.body;
    if (!title || !content) {
        return res.status(400).json({ message: 'Some required fields are missing' });
    }
     next();
 };

 const blogPostUpdateUserValidation = async (req, res, next) => { // validamos aqui se o usuário é o mesmo q mudou o post
    const { id } = req.params;
    const { authorization } = req.headers;
    const { email } = decodingToken(authorization); // aqui usei o token do loginPost no insomnia
    const allUsers = await getAllUsers();
    const userData = allUsers.filter((user) => user.email === email)[0];
    if (userData.id !== Number(id)) {
        return res.status(401).json({ message: 'Unauthorized user' });
    }
     next();
 };

module.exports = { 
    blogPostBodyCompleteValidation,
    blogPostCategoryValidation,
    blogPostByIdValidation,
    blogPostUpdateBodyValidation,
    blogPostUpdateUserValidation,
}; 