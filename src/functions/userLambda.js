const { getUsersService, registerService, loginService } = require('../services/user.service');

const register = async (event)=>{
    try{
    const res = await registerService(event.body)
    return res
    }
    catch(err){
        console.log(err)
        return {
            statusCode: 500
        }
    }
}
const login = async (event)=>{
    try{
        const res = await loginService(event.body)
        return res
    }
    catch(err){
        console.log(err)
        return {
            statusCode: 500
        }
    }
}
module.exports = {register,login,getUsers}