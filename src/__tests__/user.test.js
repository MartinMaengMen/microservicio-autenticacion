const {loginService, registerService} = require('../services/user.service')
const request = require('supertest')

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
        describe('given email does not match',()=>{
            const userLogin = {
                "email":"martinng@nttdata.com",
                "password":"martin.ng"
            }
            it('should return status code 404', async()=>{
                const {statusCode} = await postLogin.send(userLogin)
                expect(statusCode).toBe(404)
            })
            it('should not return a body', async()=>{
                const {body} = await postLogin.send(userLogin)
                expect(body).toBeInstanceOf(null)
            })
        })
    })
})

