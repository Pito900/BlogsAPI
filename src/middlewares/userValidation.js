const { getAllUsers } = require('../services/userService');

const userExistValidation = async (req, res, next) => {
  const { id } = req.params;
  const allUsers = await getAllUsers();
  const [userExist] = allUsers.filter((item) => item.id === Number(id));
  if (!userExist) {
      return res.status(404).json({ message: 'User does not exist' });
  }
  next();
};

const bodyUserValidation = (req, res, next) => {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexEmail.test(req.body.email)) {
      return res.status(400).json({ message: '"email" must be a valid email' });
    }
    if (req.body.displayName.length < 8) {
      return res.status(400).json({ 
          message: '"displayName" length must be at least 8 characters long',
        });
    }
    if (req.body.password.length < 6) {
      return res.status(400).json({ 
          message: '"password" length must be at least 6 characters long',
        });
    }
    next();
};

module.exports = {
 userExistValidation,
 bodyUserValidation,
}; 