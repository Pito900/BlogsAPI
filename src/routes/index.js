const express = require('express');
const loginValidate = require('../middlewares/loginValidation');
const userValidation = require('../middlewares/userValidation');

const router = express.Router();

router.use('/login', require('../controllers/loginController').route);
router.use('/user', require('../controllers/userController').route);

const { loginController } = require('../controllers/loginController');
const { creatUserController } = require('../controllers/userController');

router.post('/login', loginValidate.loginValidationBody, loginController);
router.post('/user', userValidation.bodyUserValidation, creatUserController);

module.exports = router;