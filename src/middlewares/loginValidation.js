const loginValidationBody = (req, res, next) => {
    const { email, password } = req.body;
    console.log(email, password);
    if (!email || !password) {
        return res.status(400).json({ message: 'Some required fields are missing' });
    }
    next();
};
module.exports = {
    loginValidationBody,
}; 