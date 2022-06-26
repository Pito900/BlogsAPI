const express = require('express');
const tokenValidate = require('../middlewares/tokenValidation');
const loginValidate = require('../middlewares/loginValidation');
const userValidation = require('../middlewares/userValidation');
const postBlogValidation = require('../middlewares/blogPostValidation');

const router = express.Router();

router.use('/login', require('../controllers/loginController').route);
router.use('/user', require('../controllers/userController').route);
router.use('/category', require('../controllers/categoryController').route);
router.use('/post', require('../controllers/blogPostController').route);

const { loginController } = require('../controllers/loginController');
const { 
    creatUserController, 
    getAllUserController,
    getUserByIdController,
} = require('../controllers/userController');
const { 
    createCategoryController, 
    getAllCategoriesController,
} = require('../controllers/categoryController');

const { 
    createBlogPostController,
    getAllBlogPostController,
    getBlogPostByIdController,
    updateBlogPostController,
 } = require('../controllers/blogPostController');

router.post('/login', loginValidate.loginValidationBody, loginController);
router.post('/user', userValidation.bodyUserValidation, creatUserController);
router.get('/user', tokenValidate.validateToken, getAllUserController);
router.get('/user/:id', userValidation.userExistValidation, 
tokenValidate.validateToken, getUserByIdController);
router.post('/categories', tokenValidate.validateToken, createCategoryController);
router.get('/categories', tokenValidate.validateToken, getAllCategoriesController);

router.post('/post', tokenValidate.validateToken, 
postBlogValidation.blogPostBodyCompleteValidation,
postBlogValidation.blogPostCategoryValidation, 
createBlogPostController);

router.get('/post', tokenValidate.validateToken, getAllBlogPostController);
router.get('/post/:id', tokenValidate.validateToken,
postBlogValidation.blogPostByIdValidation,
 getBlogPostByIdController);
 router.put('/post/:id', tokenValidate.validateToken,
postBlogValidation.blogPostUpdateBodyValidation,
postBlogValidation.blogPostUpdateUserValidation,
updateBlogPostController);

module.exports = router;