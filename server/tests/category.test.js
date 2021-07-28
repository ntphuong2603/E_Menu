import server from '../server.js'
import supertest from 'supertest'

const app = supertest(server)

const mockCategory = {
    name: 'category mock #0',
    desc: 'category mock testing #0'
}

const api = '/api/category'

describe('Category api', ()=>{
    let categoryID = null

    it('Create new category api', async () => {
        const response = await app.post(`${api}/create`).send({...mockCategory})
        expect(response.status).toBe(200)
        expect(response.body.data.name).toBe(mockCategory.name)
        expect(response.body.data.desc).toBe(mockCategory.desc)
        categoryID = response.body.data._id
    })

    it('Get category by name', async () => {
        const response = await app.get(`${api}/getOneByName`).send({name:mockCategory.name})
        expect(response.status).toBe(200)
        expect(response.body.data.name).toBe(mockCategory.name)
        expect(response.body.data._id).toBe(categoryID)
    })

    it('Create a same new category api', async () => {
        const response = await app.post(`${api}/create`).send({...mockCategory})
        expect(response.status).toBe(250)
    })

    it('Get all data from category collection', async () => {
        const response = await app.get(`${api}/getAll`)
        // console.log('Response:', response.data); 
        expect(response.status).toBe(200)
        expect(response.body.data).toEqual(expect.arrayContaining([expect.objectContaining({...mockCategory})]))
    })

    it('Change category description api', async () => {
        const response = await app.post(`${api}/update`).send({id: categoryID, desc: `${mockCategory.desc} changed`})
        expect(response.status).toBe(200)
        expect(response.body.data.desc).toBe(`${mockCategory.desc} changed`)
    })

    it('Change category name api', async () => {
        const response = await app.post(`${api}/update`).send({id: categoryID, name: `${mockCategory.name} changed`})
        expect(response.status).toBe(200)
        expect(response.body.data.name).toBe(`${mockCategory.name} changed`)
    })
    
    it('Mark delete category by ID api', async () => {
        const response = await app.post(`${api}/delete`).send({id: categoryID})
        expect(response.status).toBe(200)
        expect(response.body.data.info.isDelete).toBe(true)
    })
    
    it('Drop one category by ID', async () => {
        const response = await app.post(`${api}/dropOneByID`).send({id:categoryID})
        expect(response.status).toBe(200)
        expect(response.body.data).toEqual(expect.objectContaining({
            name: expect.stringContaining(mockCategory.name),
            desc: expect.stringContaining(mockCategory.desc)
        }))
    })
})