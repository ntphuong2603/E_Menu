import server from '../server.js'
import supertest from 'supertest'

const app = supertest(server)

const mockData = {
    username: 'username',
    password: 'password'
}

const api = '/api/user'

describe('User api', ()=>{
    let categoryID = null

    it('Create new user', async () => {
        const response = await app.post(`${api}/create`).send({...mockData})
        expect(response.status).toBe(200)
        expect(response.body.data.name).toBe(mockData.name)
        expect(response.body.data.desc).toBe(mockData.desc)
        categoryID = response.body.data._id
    })

    it('Get user by username', async () => {
        const response = await app.get(`${api}/getOneByName`).send({name:mockData.name})
        expect(response.status).toBe(200)
        expect(response.body.data.name).toBe(mockData.name)
        expect(response.body.data._id).toBe(categoryID)
    })

    it('Create a same username', async () => {
        const response = await app.post(`${api}/create`).send({...mockData})
        expect(response.status).toBe(250)
    })

    it('Get all data from user collection', async () => {
        const response = await app.get(`${api}/getAll`)
        // console.log('Response:', response.data); 
        expect(response.status).toBe(200)
        expect(response.body.data).toEqual(expect.arrayContaining([expect.objectContaining({...mockData})]))
    })

    it('Change password', async () => {
        const response = await app.post(`${api}/update`).send({id: categoryID, desc: `${mockData.desc} changed`})
        expect(response.status).toBe(200)
        expect(response.body.data.desc).toBe(`${mockData.desc} changed`)
    })

    it('Change username', async () => {
        const response = await app.post(`${api}/update`).send({id: categoryID, name: `${mockData.name} changed`})
        expect(response.status).toBe(200)
        expect(response.body.data.name).toBe(`${mockData.name} changed`)
    })
    
    it('Mark delete user by ID', async () => {
        const response = await app.post(`${api}/delete`).send({id: categoryID})
        expect(response.status).toBe(200)
        expect(response.body.data.info.isDelete).toBe(true)
    })
    
    it('Drop one user by ID', async () => {
        const response = await app.post(`${api}/dropOneByID`).send({id:categoryID})
        expect(response.status).toBe(200)
        expect(response.body.data).toEqual(expect.objectContaining({
            name: expect.stringContaining(mockData.name),
            desc: expect.stringContaining(mockData.desc)
        }))
    })
})