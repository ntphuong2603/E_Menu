import { Router } from 'express'
import user_ctr from '../controllers/user_ctr.js'
import authUser from '../middlewares/authUser.js'
import userPermission from '../middlewares/userPermission.js'
import userRoles from '../middlewares/userRoles.js'

const controller = user_ctr()
const authenticatedUser = authUser()
const permission = userPermission()
const actions = userRoles.actions
const resource = userRoles.resource

export default Router()
    .get('/getAllUsers', authenticatedUser.checkToken, permission.grantAccess(actions.read.any, resource.user), controller.getAllUsers)
    .get('/getUserByUsername', authenticatedUser.checkToken, permission.grantAccess(actions.read.own, resource.user), controller.getUserByUsername)
    .get('/getUserByID', controller.getUserByID)
    .post('/login', controller.userLogin)
    .post('/customerRegister', (req, res, next) => {
        res.locals.userInfo = {role: userRoles.roles.customer}
        next()
    }, permission.grantAccess(actions.create.own, resource.user), controller.create)
    .post('/createUser', authenticatedUser.checkToken, permission.grantAccess(actions.create.any, resource.user), controller.create)
    .post('/changePassword', authenticatedUser.checkToken , permission.grantAccess(actions.update.own, resource.user), controller.changePassword)
    .post('/deleteUserByID', authenticatedUser.checkToken, permission.grantAccess(actions.delete.any, resource.user), controller.dropUserByID)
    .post('/updateUserByID', authenticatedUser.checkToken, permission.grantAccess(actions.update.own, resource.user), controller.update)