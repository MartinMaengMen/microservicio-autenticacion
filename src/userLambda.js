const AWS = require('aws-sdk');
const { encrypt, decrypt } = require('./utils/bcrypt.handle');
const { generateToken } = require('./utils/jwt.handle');

const register = async (event)=>{
    const dynamodb = new AWS.DynamoDB.DocumentClient();

    const {email,password,name,surname,dni,beneficiary} = JSON.parse(event.body)

    const userResult = await dynamodb.get({
        TableName: 'users',
        Key: {
            'email':email
        }
    }).promise()

    if(userResult.Item){
        return {
            statusCode: 400,
            body: JSON.stringify({message: "El correo ya se encuentra registrado"})
        }
    }
    else{
        const hashPassword = await encrypt(password)

        const newUser = {
            email,
            hashPassword,
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
            body: JSON.stringify({
                message: "Usuario creado correctamente"
            })
        }
    }
}
const login = async (event)=>{
    try{
        const dynamodb = new AWS.DynamoDB.DocumentClient();

        const {email,password} = JSON.parse(event.body)

        const result = await dynamodb.get({
            TableName:'users',
            Key: {
                'email':email
            }
        }).promise()

        if(!result.Item){
            return {
                statusCode: 404
            }
        }
        
        const passHash = result.Item.hashPassword;
        const isCorrect = await decrypt(password, passHash);
        if(!isCorrect) {
            return {
                statusCode: 403
            }
          }

        const token = generateToken(email);

        return {
            isBase64Encoded: false,
            statusCode: 200,
            body: JSON.stringify({
                token: token
            })
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
            statusCode: 200,
            body: JSON.stringify({users})
        }
    }
    catch(error){
        console.log(error)
    }
}
module.exports = {register,login,getUsers}