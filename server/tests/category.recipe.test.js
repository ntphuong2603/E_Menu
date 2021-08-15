import server from '../server.js'
import supertest from 'supertest'

const app = supertest(server)

const id = {
    category: null,
    recipe: null,
}

const api = {
    category: '/api/category',
    recipe: '/api/recipe'
}

const mockData = {
    category: {
        name: 'category mock #0',
        desc: 'category mock testing #0'
    },
    recipe:{
        name: 'recipe mock #0',
        desc: 'recipe mock testing #0',
        price: 11.99
    }
}

afterAll(async () => {
    const recipeResponse = await app.post('/api/recipe/dropOneByID').send({ id : id.recipe })
    const categoryResponse = await app.post('/api/category/dropOneByID').send({ id : id.category })

    console.log('Recipe:', recipeResponse.status, ' - Recipe name:', recipeResponse.body.data.name);
    console.log('Category: ', categoryResponse.status, ' - Category name:', categoryResponse.body.data.name);
})

describe('Category api', ()=>{

    it('Create new category', async () => {
        const response = await app.post(`${api.category}/create`).send(mockData.category)
        expect(response.status).toBe(200)
        expect(response.body.data.name).toBe(mockData.category.name)
        expect(response.body.data.desc).toBe(mockData.category.desc)
        id.category = response.body.data._id
    })

    it('Get category by name', async () => {
        const response = await app.get(`${api.category}/getOneByName`).send({ name : mockData.category.name })
        expect(response.status).toBe(200)
        expect(response.body.data.name).toBe(mockData.category.name)
        expect(response.body.data._id).toBe(id.category)
    })

    it('Create a same new category', async () => {
        const response = await app.post(`${api.category}/create`).send(mockData.category)
        expect(response.status).toBe(250)
    })

    it('Get all data from category collection', async () => {
        const response = await app.get(`${api.category}/getAll`)
        expect(response.status).toBe(200)
        expect(response.body.data).toEqual(expect.arrayContaining([expect.objectContaining(mockData.category)]))
    })

    it('Change category description', async () => {
        const response = await app.post(`${api.category}/update`).send({id: id.category, desc: `${mockData.category.desc} changed`})
        expect(response.status).toBe(200)
        expect(response.body.data.desc).toBe(`${mockData.category.desc} changed`)
    })

    it('Change category name', async () => {
        const response = await app.post(`${api.category}/update`).send({id: id.category, name: `${mockData.category.name} changed`})
        expect(response.status).toBe(200)
        expect(response.body.data.name).toBe(`${mockData.category.name} changed`)
    })
    
    it('Mark delete category by ID', async () => {
        const response = await app.post(`${api.category}/delete`).send({id: id.category})
        expect(response.status).toBe(200)
        expect(response.body.data.info.isDelete).toBe(true)
    })
    
})

describe('Recipe api', ()=>{

    it('Create new recipe', async () => {
        const response = await app.post(`${api.recipe}/create`).send({...mockData.recipe, categoryID: id.category})
        expect(response.status).toBe(200)
        expect(response.body.data.name).toBe(mockData.recipe.name)
        expect(response.body.data.desc).toBe(mockData.recipe.desc)
        expect(response.body.data.price).toBe(mockData.recipe.price)
        id.recipe = response.body.data._id
    })

    it('Get recipe by name', async () => {
        const response = await app.get(`${api.recipe}/getOneByName`).send({ name : mockData.recipe.name })
        expect(response.status).toBe(200)
        expect(response.body.data.name).toBe(mockData.recipe.name)
        expect(response.body.data._id).toBe(id.recipe)
    })

    it('Get recipe by ID', async () => {
        const response = await app.get(`${api.recipe}/getOneByID`).send({ id : id.recipe })
        expect(response.status).toBe(200)
        expect(response.body.data.name).toBe(mockData.recipe.name)
        expect(response.body.data._id).toBe(id.recipe)
    })

    it('Create a same new recipe', async () => {
        const response = await app.post(`${api.recipe}/create`).send(mockData.recipe)
        expect(response.status).toBe(250)
    })

    it('Get all data from recipe collection', async () => {
            const response = await app.get(`${api.recipe}/getAll`)
            expect(response.status).toBe(200)
            expect(response.body.data).toEqual(expect.arrayContaining([expect.objectContaining(mockData.recipe)]))
    })

    it('Get all recipes from collection by category ID', async () => {
        const response = await app.get(`${api.recipe}/getAllByCategory`).send({ categoryID : id.category })
        expect(response.status).toBe(200)
        expect(response.body.data).toEqual(expect.arrayContaining([expect.objectContaining(mockData.recipe)]))
    })

    it('Change recipe description', async () => {
        const response = await app.post(`${api.recipe}/update`).send({id: id.recipe, desc: `${mockData.recipe.desc} changed`})
        expect(response.status).toBe(200)
        expect(response.body.data.desc).toBe(`${mockData.recipe.desc} changed`)
    })

    it('Change recipe name', async () => {
        const response = await app.post(`${api.recipe}/update`).send({id: id.recipe, name: `${mockData.recipe.name} changed`})
        expect(response.status).toBe(200)
        expect(response.body.data.name).toBe(`${mockData.recipe.name} changed`)
    })

    it('Change recipe price', async () => {
        const newPrice = 9.99
        const response = await app.post(`${api.recipe}/update`).send({id: id.recipe, price: newPrice})
        expect(response.status).toBe(200)
        expect(response.body.data.price).toBe(newPrice)
    })

    it('Change recipe station', async () => {
        const STATION = ['sushi-bar', 'kitchen - deep fryer', 'kitchen - cooking']
        const response = await app.post(`${api.recipe}/update`).send({ id: id.recipe, station : STATION.slice(0,2)})
        expect(response.status).toBe(200)
        expect(response.body.data.station).toEqual(expect.arrayContaining([STATION[1]]))
    })

    describe('Change recipe picture', () => {
        const SELECTION = ['dine-in','take-out','delivery','skipDishes']
        const LINK = ["test link #0", 'test link $1']

        it('Change recipe picture #0', async () => {
            const data_0 = {
                selection: SELECTION[0],
                picLink: LINK[0]
            }
            const response = await app.post(`${api.recipe}/updatePicture`).send({ id : id.recipe, ...data_0})
            expect(response.status).toBe(200)
            expect(response.body.data.picLocation).toEqual(expect.arrayContaining([data_0])) 
        })

        it('Change recipe picture #1', async () => {
            const data_1 = {
                selection: SELECTION[1],
                picLink: LINK[1]
            }
            const response = await app.post(`${api.recipe}/updatePicture`).send({ id : id.recipe, ...data_1})
            expect(response.status).toBe(200)
            expect(response.body.data.picLocation).toEqual(expect.arrayContaining([data_1]))
        })

        
        it('Change recipe picture #2', async () => {
            const data = {
                selection: SELECTION[0],
                picLink: LINK[1]
            }
            const response = await app.post(`${api.recipe}/updatePicture`).send({ id : id.recipe, ...data})
            expect(response.status).toBe(200)
            expect(response.body.data.picLocation).toEqual(expect.arrayContaining([data]))
        })
    })
    
    it('Mark delete recipe by ID', async () => {
        const response = await app.post(`${api.recipe}/delete`).send({ id : id.recipe })
        expect(response.status).toBe(200)
        expect(response.body.data.info.isDelete).toBe(true)
    })
    
})