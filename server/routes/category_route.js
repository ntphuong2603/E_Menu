import { Router } from 'express'
import CategoryController from '../controllers/category_ctr.js'

// const category_api = express.Router()
const controller = new CategoryController()

// category_api
//     .get('/getAll', controller.getAll)
//     .get('/getOneCritera', controller.getOneByCriteria)
//     .post('/create', controller.create)

// export default category_api

export default Router()
    .get('/getAll', controller.getAll)
    .get('/getOneByName', controller.getOneByName)
    .post('/create', controller.create)
    .post('/update', controller.update)
    .post('/delete', controller.delete)
    .post('/dropOneByID', controller.dropOneByID)