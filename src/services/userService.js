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

const getAllUsers = async () => {
    const usersAllData = await User.findAll();
    const usersWithoutPassword = usersAllData.map((item) => {
        const obj = {
            id: item.id,
            displayName: item.displayName,
            email: item.email,
            image: item.image,
        };
        return obj;
    });

    return usersWithoutPassword;
};

module.exports = {
    createUser,
    userAlreadyReg,
    getAllUsers,
};
