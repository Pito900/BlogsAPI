const express = require('express');
const loginValidate = require('../middlewares/loginValidation');

const router = express.Router();

router.use('/login', require('../controllers/loginController').route);

const { loginController } = require('../controllers/loginController');

router.post('/login', loginValidate.loginValidationBody, loginController);

module.exports = router;