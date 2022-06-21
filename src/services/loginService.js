const { User } = require('../database/models');

const loginService = async (email, password) => {
    const findUser = await User.findOne({
        where: { email, password },
    });
    return findUser;
};

module.exports = {
    loginService,
};
