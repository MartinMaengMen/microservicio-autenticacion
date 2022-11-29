const request = require('supertest')
const userService = require('../services/user.service')

const requestLogin = request('https://1xvsj3adyf.execute-api.sa-east-1.amazonaws.com')

describe('user',()=>{
    describe('user login',()=>{
        describe('given email does not registered',()=>{
            const userLogin = {
                "email":"martinng@nttdata.com",
                "password":"martin.ng"
            }
            it('should return status code 404', async()=>{
                const {statusCode} = await requestLogin.post('/login').send(userLogin)
                expect(statusCode).toBe(404)
            })
        })
        describe('given user does not match',()=>{
            const userLogin = {
                "email":"martin.ng@nttdata.com",
                "password":"abcds"
            }
            it('should return status code 403', async()=>{
                const {statusCode} = await requestLogin.post('/login').send(userLogin)
                expect(statusCode).toBe(403)
            })
        })
        describe('given user is registered',()=>{
            const userLogin = {
                "email":"martin.ng@nttdata.com",
                "password":"martin.ng"
            }
            it('should return status code 200', async()=>{
                const {statusCode,body} = await requestLogin.post('/login').send(userLogin)
                expect(statusCode).toBe(200)
                expect(body).toBeInstanceOf(Object)
            })
        })
    })
    describe('user register',()=>{
        describe('given email already exists',()=>{
            const userRegister = {
                "email":"martin.ng@nttdata.com",
                "password":"abcd1234#",
                "dni":56738492,
                "name":"abcd",
                "surname":"efg"
            }
            it('should return status code 400', async()=>{
                const {statusCode} = await requestLogin.post('/register').send(userRegister)
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
                const {statusCode} = await requestLogin.post('/register').send(userRegister)
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
                const {statusCode} = await requestLogin.post('/register').send(userRegister)
                expect(statusCode).toBe(400)
            })
        })
    })
    
})

