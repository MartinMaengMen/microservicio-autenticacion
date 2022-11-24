const {sign, verify} = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

function generatePolicyDocument(effect, methodArn) {
  if (!effect || !methodArn) return null;

  const policyDocument = {
    Version: "2012-10-17",
    Statement: [
      {
        Action: "execute-api:Invoke",
        Effect: effect,
        Resource: methodArn
      }
    ]
  };

  return policyDocument;
}

function generateAuthResponse(principalId, effect, methodArn) {
  const policyDocument = generatePolicyDocument(effect, methodArn);

  return {
    principalId,
    policyDocument
  };
}

const generateToken = (id) => {
  const jwt = sign({ id }, JWT_SECRET, {expiresIn: '2h'});

  return jwt;
};

module.exports = { generateToken, generateAuthResponse };
