const {loginService,registerService} = require('../services/user.service')
const {config} = require('../config/dynamodb-client')
const {DocumentClient} = require('aws-sdk/clients/dynamodb');
const ddb = new DocumentClient(config);

describe('user',()=>{
    describe('user login',()=>{
        describe('given email does not registered',()=>{
            const userLogin = {
                email:"martinng@nttdata.com",
                password:"martin.ng"
            }
            it('should return status code 404', async()=>{
                const {statusCode} = await loginService(JSON.stringify(userLogin))
                expect(statusCode).toBe(404)
            })
        })
        describe('given user does not match',()=>{
            const userLogin = {
                "email":"martin.ng@nttdata.com",
                "password":"abcds"
            }
            it('should return status code 403', async()=>{
                const {statusCode} = await loginService(JSON.stringify(userLogin))
                expect(statusCode).toBe(403)
            })
        })
        describe('given user is registered',()=>{
            const userLogin = {
                email:"martin.ng@nttdata.com",
                password:"martin.ng"
            }
            it('should return status code 200', async()=>{
                const {statusCode,body} = await loginService(JSON.stringify(userLogin))
                expect(statusCode).toBe(200)
                expect(body).toBeInstanceOf(Object)
            })
        })
    })
    /*describe('user register',()=>{
        describe('given email already exists',()=>{
            const userRegister = {
                "email":"martin.ng@nttdata.com",
                "password":"abcd1234#",
                "dni":56738492,
                "name":"abcd",
                "surname":"efg"
            }
            it('should return status code 400', async()=>{
                const {statusCode} = await registerService(JSON.stringify(userRegister))
                expect(statusCode).toBe(400)
            })
        })
        describe('given email is not correct',()=>{
            const userRegister = {
                "email":"martin.ng@nttda",
                "password":"abcd1234#",
                "dni":56738492,
                "name":"abcd",
                "surname":"efg"
            }
            it('should return status code 400', async()=>{
                const {statusCode} = await registerService(JSON.stringify(userRegister))
                expect(statusCode).toBe(400)
            })
        })
        describe('given dni is not correct',()=>{
            const userRegister = {
                "email":"martin.ng@nttdata.com",
                "password":"abcd1234#",
                "dni":123,
                "name":"abcd",
                "surname":"efg"
            }
            it('should return status code 400', async()=>{
                const {statusCode} = await registerService(JSON.stringify(userRegister))
                expect(statusCode).toBe(400)
            })
        })
        describe('given user parameters are correct',()=>{
            const userRegister = {
                "email":"123asd@nttdata.com",
                "password":"abcd1234#",
                "dni":73137977,
                "name":"martin",
                "surname":"ng"
            }
            it('should return status code 200', async()=>{
                const {statusCode} = await registerService(JSON.stringify(userRegister))
                expect(statusCode).toBe(200)
            })
        })
    })*/
})

