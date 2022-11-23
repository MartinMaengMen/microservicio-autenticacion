const {hash,compare} = require("bcryptjs");

const encrypt = async (value) => {
  const valueHash = await hash(value, 8);

  return valueHash;
};

const decrypt = async (value, valueHash) => {
  const isCorrect = await compare(value, valueHash);

  return isCorrect;
};

module.exports = { encrypt, decrypt };
