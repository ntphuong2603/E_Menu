import express from 'express'
import categoryController from '../controllers/category-ctr'

const apiCategory = express.Router() 
// const categoryCtr = categoryController()

apiCategory.get('/getAll', categoryController().getAll)

// apiCategory
//     .get('/getAllCategories', categoryController.getAll)
    // .post('/createCategory', categoryController.create)
    // .post('/updateCategory', categoryController.update)
    // .post('/deleteCategory', categoryController.delete)

export default apiCategory