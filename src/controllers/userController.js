const express = require('express');
const { createUser, userAlreadyReg, getAllUsers, getUserById } = require('../services/userService');
const { generateToken } = require('../jwt/JWT');

const creatUserController = async (req, res) => {
    const userAlreadyExist = await userAlreadyReg(req.body);
    if (userAlreadyExist) {
        return res.status(409).json({ message: 'User already registered' });
    }
    try {
        const createdUser = await createUser(req.body);
        const token = generateToken(JSON.stringify({ email: createdUser.email }));
        return res.status(201).json({ token });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    } 
};

const getAllUserController = async (_req, res) => {
    try {
        const allUsers = await getAllUsers();
        return res.status(200).json(allUsers);
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
};

const getUserByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await getUserById(id);
        return res.status(200).json(user);
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
};

const route = express.Router();

module.exports = {
    route,
    creatUserController,
    getAllUserController,
    getUserByIdController,
};