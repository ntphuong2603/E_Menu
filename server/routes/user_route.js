import { Router } from 'express'
import user_ctr from '../controllers/user_ctr.js'
import authUser from '../middlewares/authUser.js'
import userRoles from '../middlewares/userRoles.js'

const controller = user_ctr()
const authenticatedUser = authUser()
const grantAccess = userRoles().grantAccess
const actions = userRoles().ACTION
const resource = userRoles().RESOURCE

export default Router()
    .get('/getAllUsers', controller.getAllUsers)
    .post('/createUser',authenticatedUser.checkToken, grantAccess(actions.ANY.CREATE, resource.USER), controller.create)
    .post('/login', controller.userLogin)
    .get('/getUserByUsername', controller.getUserByUsername)
    .get('/getUserByID', controller.getUserByID)
    .post('/changePassword',authenticatedUser.checkToken ,controller.changePassword)
    // .post('/create', controller.create)
    // .post('/delete', controller.delete)
    // .post('/update', controller.update)
    // .post('/dropOneByID', controller.dropOneByID)