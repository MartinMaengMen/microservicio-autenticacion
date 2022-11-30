const { verify } = require("jsonwebtoken");

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

const jwtHandlerService = (event,callback)=>{
    const token = event.authorizationToken.replace("Bearer ", "");
    const methodArn = event.methodArn;
  
    if (!token || !methodArn) return callback(null, "Unauthorized");
  
    const secret = process.env.JWT_SECRET;

    const decoded = verify(token, secret);
  
    if (decoded && decoded.id) {
      return callback(null, generateAuthResponse(decoded.id, "Allow", methodArn));
    } else {
      return callback(null, generateAuthResponse(decoded.id, "Deny", methodArn));
    }
}

module.exports = {jwtHandlerService}