const request = require('supertest')
const {loginService,registerService} = require('../services/user.service')

const requestLogin = request('https://1xvsj3adyf.execute-api.sa-east-1.amazonaws.com')

describe('user',()=>{
    describe('user login',()=>{
        const postLogin = requestLogin.post('/login')
        describe('given user is registered',()=>{
            const userLogin = {
                "email":"martin.ng@nttdata.com",
                "password":"martin.ng"
            }
            it('should return status code 200', async()=>{
                const {statusCode} = await postLogin.send(userLogin)
                expect(statusCode).toBe(200)
            })
            it('should return an object', async()=>{
                const {body} = await postLogin.send(userLogin)
                expect(body).toBeInstanceOf(Object)
            })
        })
    })
    describe('user register',()=>{
        const postLogin = requestLogin.post('/register')
        describe('given email already exists',()=>{
            const userRegister = {
                "email":"martin.ng@nttdata.com",
                "password":"abcd1234#",
                "dni":56738492,
                "name":"abcd",
                "surname":"efg"
            }
            it('should return status code 400', async()=>{
                const {statusCode} = await postLogin.send(userRegister)
                expect(statusCode).toBe(400)
            })
        })
    })
})

