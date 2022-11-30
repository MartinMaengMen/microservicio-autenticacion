const AWS = require('aws-sdk');
const { encrypt, decrypt } = require('../utils/bcrypt.handle');
const { generateToken } = require('../utils/jwt.handle');
const { validateParameters } = require('../utils/validations.handle');
const {config} = require('../config/dynamodb-client')

const dynamodb = new AWS.DynamoDB.DocumentClient({region: 'sa-east-1'});

const loginService = async (body)=>{
        const {email,password} = JSON.parse(body)

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
        delete result.Item.hashPassword
        return {
            isBase64Encoded: false,
            statusCode: 200,
            body: JSON.stringify({
                token: token,
                user: result.Item
            })
        }
}
const registerService = async (body)=>{

    const {email,password,name,surname,dni} = JSON.parse(body)
    const validationMessage = validateParameters(email,password,dni)

    if(validationMessage != ''){
        return {
            statusCode: 400,
            body: JSON.stringify({message: validationMessage})
        }
    }
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
        const beneficiary = Boolean(Math.round(Math.random()))
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
module.exports = {registerService,loginService}