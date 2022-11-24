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
const getUsers = async(event)=>{
    try{
        const users = await getUsersService()
        return {
            statusCode: 200,
            body: JSON.stringify({users})
        }
    }
    catch(error){
        console.log(error)
    }
}
module.exports = {register,login,getUsers}