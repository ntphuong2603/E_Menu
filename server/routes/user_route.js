import { Router } from 'express'
import user_ctr from '../controllers/user_ctr.js'
import authUser from '../middlewares/authUser.js'
import userRoles from '../middlewares/userRoles.js'

const controller = user_ctr()
const authenticatedUser = authUser()
const roles = userRoles()
const grantAccess = roles.grantAccess
const actions = roles.actions
const resource = roles.resource

export default Router()
    .get('/getAllUsers', authenticatedUser.checkToken, grantAccess(actions.read.any, resource.user), controller.getAllUsers)
    .get('/getUserByUsername', authenticatedUser.checkToken, grantAccess(actions.read.own, resource.user), controller.getUserByUsername)
    .get('/getUserByID', controller.getUserByID)
    .post('/login', controller.userLogin)
    .post('/customerRegister', (req, res, next) => {
        res.locals.userInfo = {role: 'customer'}
        next()
    }, grantAccess(actions.create.own, resource.user), controller.create)
    .post('/createUser', authenticatedUser.checkToken, grantAccess(actions.create.any, resource.user), controller.create)
    .post('/changePassword', authenticatedUser.checkToken , grantAccess(actions.update.own, resource.user), controller.changePassword)
    .post('/deleteUserByID', authenticatedUser.checkToken, grantAccess(actions.delete.any, resource.user), controller.dropUserByID)
    .post('/updateUserByID', authenticatedUser.checkToken, grantAccess(actions.update.own, resource.user), controller.update)
    // .post('/create', controller.create)
    // .post('/delete', controller.delete)
    // .post('/update', controller.update)
    // .post('/dropOneByID', controller.dropOneByID)