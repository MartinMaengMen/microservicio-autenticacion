const { verify } = require("jsonwebtoken");
const { generateAuthResponse } = require("../utils/jwt.handle");

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