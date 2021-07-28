import { Router } from 'express'
import category_ctr from '../controllers/category_ctr.js'

const controller = category_ctr()

export default Router()
    .get('/getAll', controller.getAll)
    .get('/getOneByName', controller.getOneByName)
    .get('/getOneByID', controller.getOneByID)
    .post('/create', controller.create)
    .post('/delete', controller.delete)
    .post('/update', controller.update)
    .post('/dropOneByID', controller.dropOneByID)