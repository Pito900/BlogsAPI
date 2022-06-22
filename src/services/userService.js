const { User } = require('../database/models');

const userAlreadyReg = (reqBody) => User.findOne({ where: { email: reqBody.email } });// essa função acha um email na base de dados;

const createUser = async (reqBody) => {
    const newUser = await User.create({
        displayName: reqBody.displayName,
        email: reqBody.email,
        password: reqBody.password,
        image: reqBody.image,
    });
    return newUser;
};

module.exports = {
    createUser,
    userAlreadyReg,
};
