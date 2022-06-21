// aqui irei montar a estrutura base para o JWT
const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

const jwtConfig = {
    expiresIn: '15m',
    algorithm: 'HS256',
};

const generateToken = (payload) => jwt.sign(JSON.parse(payload), JWT_SECRET, jwtConfig);

const tokenVerification = (token) => {
    if (!token) { // quando o token é vazio
        throw new Error(JSON.stringify({ status: 401, message: 'Token not found' }));  
    }
    try { // se o token vier correto 
        const tokenValidationResult = jwt.verify(token, JWT_SECRET, jwtConfig);
        return tokenValidationResult;
      } catch (e) { // o token veio, porém é inválido ou ta expirado (pasou 15 min)
        throw new Error(JSON.stringify({ status: 401, message: 'Expired or invalid token' }));
      }
};

const decodingToken = (token) => jwt.decode(token);

module.exports = {
    generateToken,
    tokenVerification,
    decodingToken,
};