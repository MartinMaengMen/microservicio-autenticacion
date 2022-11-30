const {sign} = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

const generateToken = (id) =>{
  const jwt = sign({ id }, JWT_SECRET, {expiresIn: '2h'});

  return jwt;
};

module.exports = { generateToken };
