const express = require('express');
const { loginService } = require('../services/loginService');
const { generateToken } = require('../jwt/JWT');

const route = express.Router();

const loginController = async (req, res) => {
    try { 
    const { email, password } = req.body;
    const findUser = await loginService(email, password);
    if (!findUser) {
        return res.status(400).json({ message: 'Invalid fields' });
    }
    const token = generateToken(JSON.stringify({ email: findUser.email }));
    return res.status(200).json({ token });
} catch (error) {
    return res.status(500).json({ message: error.message });
  } 
};

module.exports = {
    route,
    loginController,
};