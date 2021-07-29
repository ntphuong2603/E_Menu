import server from '../server.js'
import supertest from 'supertest'

const app = supertest(server)

const mockData = {
    username: 'username',
    password: 'password'
}

const api = '/api/user'


describe('User api', ()=>{
    let userID = null
    let token = null
    const newPass = '0987654321'

    it('Create new user', () => {
        setTimeout(async()=>{
            const response = await app.post(`${api}/createUser`).send({...mockData})
            expect(response.status).toBe(200)
            expect(response.body.data.username).toBe(mockData.username)
            userID = response.body.data._id
            console.log(response.body.data);
        },7000)
        
    })

    it('Get user by username', async () => {
        const response = await app.get(`${api}/getUserByUsername`).send({username:mockData.username})
        expect(response.status).toBe(200)
        expect(response.body.data.username).toBe(mockData.username)
        // expect(response.body.data._id).toBe(userID)
    })

    // it('User login', async () => {
    //     setTimeout(async()=>{
    //         const response = await app.post(`${api}/login`).send({...mockData})
    //         expect(response.status).toBe(200)
    //         token = response.body.data.token
    //     },7000)
    // })

    // it('Get all data from user collection', async () => {
    //     const response = await app.get(`${api}/getAllUsers`)
    //     // console.log('Response:', response.data); 
    //     expect(response.status).toBe(200)
    //     expect(response.body.data).toEqual(expect.arrayContaining([expect.objectContaining({username:mockData.username})]))
    // })

    // it('Change password', async () => {
    //     const response = await app.post(`${api}/changePassword`).send({ username: mockData.username, token: token, oldPass: mockData.password, newPass: newPass})
    //     expect(response.status).toBe(200)
    //     expect(response.body.data.desc).toBe(`${mockData.desc} changed`)
    // })

    // it('Change username', async () => {
    //     const response = await app.post(`${api}/update`).send({id: userID, name: `${mockData.name} changed`})
    //     expect(response.status).toBe(200)
    //     expect(response.body.data.username).toBe(mockData.username)
    //     // expect(response.body.data.password).toBe(expect.hash)
    // })
    
    // it('Mark delete user by ID', async () => {
    //     const response = await app.post(`${api}/delete`).send({id: userID})
    //     expect(response.status).toBe(200)
    //     expect(response.body.data.info.isDelete).toBe(true)
    // })
    
    // it('Drop one user by ID', async () => {
    //     const response = await app.post(`${api}/dropOneByID`).send({id:userID})
    //     expect(response.status).toBe(200)
    //     expect(response.body.data).toEqual(expect.objectContaining({
    //         name: expect.stringContaining(mockData.name),
    //         desc: expect.stringContaining(mockData.desc)
    //     }))
    // })
})