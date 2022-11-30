
const { jwtHandlerService } = require("../services/authorize.service");

const handler = (event, context, callback) => {

    const response = jwtHandlerService(event)
    return response
  };
module.exports = {handler}