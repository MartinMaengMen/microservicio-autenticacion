const {v4} = require('uuid')
const AWS = require('aws-sdk')

const registerUser = async (event)=>{
    const dynamodb = new AWS.DynamoDB.DocumentClient();

    const {email,name,surname,dni,beneficiary} = JSON.parse(event.body)
    const id = v4()

    const newUser = {
        id,
        email,
        name,
        surname,
        dni,
        beneficiary
    }
    await dynamodb.put({
        TableName: 'users',
        Item: newUser
    }).promise()

    return {
        statusCode: 200,
        body: JSON.stringify(newUser)
    }
}
const login = async (event)=>{
    try{
        const dynamodb = new AWS.DynamoDB.DocumentClient();

        const {id} = event.pathParameters
    
        const result = await dynamodb.get({
            TableName: 'users',
            Key: {
                id : id
            }
        }).promise()
    
        const res = result.Item;
    
        console.log(res)
        
        return {
            status: 200,
            body: {res}
        }
    }
    catch(error){
        console.log(error)
    }
}
const getUsers = async(event)=>{
    try{
        const dynamodb = new AWS.DynamoDB.DocumentClient();
        const result = await dynamodb.scan({
            TableName:'users'
        }).promise()
        const users = result.Items
        return {
            status: 200,
            body: {users}
        }
    }
    catch(error){
        console.log(error)
    }
}
module.exports = {registerUser,login,getUsers}