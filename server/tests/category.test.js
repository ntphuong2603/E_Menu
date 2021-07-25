import server from '../server.js'
import supertest from 'supertest'

const app = supertest(server)

const mockCategory = {
    name: 'category mock #0',
    desc: 'category mock testing #0'
}



describe('Category api', ()=>{
    let categoryID = null
    
    afterAll(async ()=>{
        await app.post('api/category/dropOneByID').send({id:categoryID})
    })

    it('Create new category api', async () => {
        const response = await app.post('/api/category/create').send({...mockCategory})
        expect(response.status).toBe(200)
        // console.log('Response:', response.body);
        expect(response.body.data.name).toBe(mockCategory.name)
        expect(response.body.data.desc).toBe(mockCategory.desc)
        categoryID = response.body.data._id
        // console.log('Category ID - Create:', categoryID);
    })
    it('Get category by name', async () => {
        // console.log('Category ID - Get:', categoryID);
        const response = await app.get('/api/category/getOneByName').send({name:mockCategory.name})
        expect(response.status).toBe(200)
        // console.log('Response:', response.body);
        expect(response.body.data.name).toBe(mockCategory.name)
        expect(response.body.data._id).toBe(categoryID)
    })
    it('Change category name api', async () => {
        // console.log('Category ID - Change name:', categoryID);
        const response = await app.post('/api/category/update').send({id: categoryID, name: `${mockCategory.name} changed`})
        expect(response.status).toBe(200)
        // console.log('Response:', response.body);
        expect(response.body.data.name).toBe(`${mockCategory.name} changed`)
    })
    it('Change category description api', async () => {
        // console.log('Category ID - Change desc:', categoryID);
        const response = await app.post('/api/category/update').send({id: categoryID, desc: `${mockCategory.desc} changed`})
        expect(response.status).toBe(200)
        // console.log('Response:', response.body);
        expect(response.body.data.desc).toBe(`${mockCategory.desc} changed`)
    })
    test('Mark delete category by ID api', async () => {
        // console.log('Category ID - Delete:', categoryID);
        const response = await app.post('/api/category/delete').send({id: categoryID})
        expect(response.status).toBe(200)
        // console.log('Response - Delete:', response.body);
        expect(response.body.data.info.isDelete).toBe(true)
    })
    // it('Create new category api', async () => {
    //     const response = await app.post('/api/category/create').send({...mockCategory})
    //     expect(response.status).toBe(250)
    //     expect(response.msg).toBe('This category name already existed in the system, pls check again!!!')
    // })
})