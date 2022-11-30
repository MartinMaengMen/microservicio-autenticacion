
const { jwtHandlerService } = require("../services/authorize.service");

const handler = (event, context, callback) => {

    const response = jwtHandlerService(event,callback)
    return response
  };
module.exports = {handler}