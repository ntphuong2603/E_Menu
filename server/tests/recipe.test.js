import server from '../server.js'
import supertest from 'supertest'

const app = supertest(server)

const mockData = {
    name: 'recipe mock #0',
    desc: 'recipe mock testing #0',
    price: 11.99
}

const api = '/api/recipe'

describe('Recipe api', ()=>{
    let recipeID = null

    it('Create new recipe api', async () => {
        const response = await app.post(`${api}/create`).send({...mockData})
        expect(response.status).toBe(200)
        expect(response.body.data.name).toBe(mockData.name)
        expect(response.body.data.desc).toBe(mockData.desc)
        expect(response.body.data.price).toBe(mockData.price)
        recipeID = response.body.data._id
    })

    it('Get recipe by name', async () => {
        const response = await app.get(`${api}/getOneByName`).send({name:mockData.name})
        expect(response.status).toBe(200)
        expect(response.body.data.name).toBe(mockData.name)
        expect(response.body.data._id).toBe(recipeID)
    })

    it('Get recipe by ID', async () => {
        const response = await app.get(`${api}/getOneByID`).send({id:recipeID})
        expect(response.status).toBe(200)
        expect(response.body.data.name).toBe(mockData.name)
        expect(response.body.data._id).toBe(recipeID)
    })

    it('Create a same new recipe api', async () => {
        const response = await app.post(`${api}/create`).send({...mockData})
        expect(response.status).toBe(250)
    })

    it('Get all data from recipe collection', async () => {
        const response = await app.get(`${api}/getAll`)
        expect(response.status).toBe(200)
        expect(response.body.data).toEqual(expect.arrayContaining([expect.objectContaining({...mockData})]))
    })

    it('Change recipe description api', async () => {
        const response = await app.post(`${api}/update`).send({id: recipeID, desc: `${mockData.desc} changed`})
        expect(response.status).toBe(200)
        expect(response.body.data.desc).toBe(`${mockData.desc} changed`)
    })

    it('Change recipe name api', async () => {
        const response = await app.post(`${api}/update`).send({id: recipeID, name: `${mockData.name} changed`})
        expect(response.status).toBe(200)
        expect(response.body.data.name).toBe(`${mockData.name} changed`)
    })

    it('Change recipe price api', async () => {
        const newPrice = 9.99
        const response = await app.post(`${api}/update`).send({id: recipeID, price: newPrice})
        expect(response.status).toBe(200)
        expect(response.body.data.price).toBe(newPrice)
    })
    
    it('Mark delete recipe by ID api', async () => {
        const response = await app.post(`${api}/delete`).send({id: recipeID})
        expect(response.status).toBe(200)
        expect(response.body.data.info.isDelete).toBe(true)
    })
    
    it('Drop one recipe by ID', async () => {
        const response = await app.post(`${api}/dropOneByID`).send({id:recipeID})
        expect(response.status).toBe(200)
        expect(response.body.data).toEqual(expect.objectContaining({
            name: expect.stringContaining(mockData.name),
            desc: expect.stringContaining(mockData.desc)
        }))
    })
})