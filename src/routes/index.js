const express = require('express');
const tokenValidate = require('../middlewares/tokenValidation');
const loginValidate = require('../middlewares/loginValidation');
const userValidation = require('../middlewares/userValidation');

const router = express.Router();

router.use('/login', require('../controllers/loginController').route);
router.use('/user', require('../controllers/userController').route);
router.use('/category', require('../controllers/categoryController').route);

const { loginController } = require('../controllers/loginController');
const { 
    creatUserController, 
    getAllUserController,
    getUserByIdController,
} = require('../controllers/userController');
const { createCategoryController } = require('../controllers/categoryController');

router.post('/login', loginValidate.loginValidationBody, loginController);
router.post('/user', userValidation.bodyUserValidation, creatUserController);
router.get('/user', tokenValidate.validateToken, getAllUserController);
router.get('/user/:id', userValidation.userExistValidation, 
tokenValidate.validateToken, getUserByIdController);
router.post('/categories', tokenValidate.validateToken, createCategoryController);
module.exports = router;