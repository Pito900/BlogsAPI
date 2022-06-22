const { User } = require('../database/models');

const userAlreadyReg = (reqBody) => User.findOne({ where: { email: reqBody.email } });// essa função acha um email na base de dados;

const userNoPassword = (object) => {
    const newObj = {
        id: object.id,
        displayName: object.displayName,
        email: object.email,
        image: object.image,
    };
    return newObj;
};

const createUser = async (reqBody) => {
    const newUser = await User.create({
        displayName: reqBody.displayName,
        email: reqBody.email,
        image: reqBody.image,
    });
    return newUser;
};

const getAllUsers = async () => {
    const usersAllData = await User.findAll();
    const usersWithoutPassword = usersAllData.map((item) => userNoPassword(item));
    return usersWithoutPassword;
};

const getUserById = async (id) => {
    const userData = await User.findByPk(id);
    return userNoPassword(userData);
};

module.exports = {
    createUser,
    userAlreadyReg,
    getAllUsers,
    getUserById,
};
