import { Router } from 'express'
import recipe_ctr from '../controllers/recipe_ctr.js'

const controller = recipe_ctr()

export default Router()
    .get('/getAll', controller.getAll)
    .get('/getOneByName', controller.getOneByName)
    .get('/getOneByID', controller.getOneByID)
    .post('/create', controller.create)
    .post('/delete', controller.delete)
    .post('/updatePicture', controller.updatePicture)
    .post('/update', controller.update)
    .post('/dropOneByID', controller.dropOneByID)