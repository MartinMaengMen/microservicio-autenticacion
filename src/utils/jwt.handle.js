const {sign, verify} = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || 'defaultSecretKey';

const generateToken = (id) => {
  const jwt = sign({ id }, JWT_SECRET, {expiresIn: '2h'});

  return jwt;
};

const verifyToken = (jwt) => {
  const isVerify = verify(jwt, JWT_SECRET);

  return isVerify;
};

module.exports = { generateToken, verifyToken };
