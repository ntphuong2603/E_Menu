import userSchema from "../database/models/user_model.js";
import BaseController from "./base_controller.js";
import dotenv from 'dotenv'
import userRoles from "../middlewares/userRoles.js";

export default () => {
    dotenv.config()

    const baseController = new BaseController('User', userSchema)

    const isUsernameExisted = async (username) => {
        const category = await baseController.getData(baseController.getOneByCriteria, { username : username })
        return !!category
    }

    const checkingID = (categoryID) => {
        if (categoryID === undefined || categoryID.length === 0) {
            baseController.responseError(res, 400, 'Length of category ID must be validated')
            return false
        }
        return true
    }

    const getRole = (role) => {
        const roles = userRoles().roles

        if (role === roles.customer) return role
        if (role === roles.super) return roles.owner
        if (role === roles.owner) return roles.admin

        return roles.user
    }

    return {
        async getAllUsers (req, res) {
            if (res.locals.permission){
                await baseController.responseData(res, baseController.getAll, {})
            } else {
                baseController.responseError(res, 250, 'Permission to view all users was deneied.')
            }
        },

        async getUserByUsername(req, res) {
            const username = req.body.username
            if (username === undefined || username.length === 0) {
                baseController.responseError(res, 400, 'Length of username must be greater than 0')
                return
            }
            await baseController.responseData(res, baseController.getOneByCriteria, { username: username })
        },

        async getUserByID (req, res) {
            const userID = req.body.id
            if (checkingID(userID)) await baseController.responseData(res, baseController.getOneByID, userID)
        },

        async create (req, res) {
            const userData = { username: req.body.username, password: req.body.password }

            if (!res.locals.permission){
                baseController.responseError(res, 250, 'Permission to create new user was deneied.')
                return
            }

            if (await isUsernameExisted(userData.username)){
                baseController.responseError(res, 250, 'Username already existed in the system, pls check again!!!')
                return 
            }  

            userData.role = getRole(res.locals.userInfo.role) 

            await baseController.responseData(res, baseController.create, userData)
            
        },
        // not yet finish update function about user information
        async update (req, res) {
            if (!res.locals.permission){
                baseController.responseError(res, 250, 'Permission to update user info was deneied.')
                return
            }

            const userData = {}

            await baseController.responseData(res, baseController.update, userData)
        },

        async userLogin (req, res) {
            const userData = { username: req.body.username, password: req.body.password }
            const user = await baseController.getData(baseController.getOneByCriteria, { username : userData.username })
            if (!user.checkPassword(userData.password)){
                baseController.responseError(res, 400, 'Username or Password is incorrected.')
            } else {
                baseController.responseData(res, null, {token: user.generateToken()}, 'User login successfully!!!')
            }

        },

        async changePassword (req, res) {
            const userData = {
                token: req.body.token,
                oldPass: req.body.oldPass, 
                newPass: req.body.newPass
            }
            const userInfo = res.locals.userInfo
            if (userInfo !== (null || undefined)){
                const user = await baseController.getData(baseController.getOneByID, userInfo.id)
                if (user.checkPassword(userData.oldPass)){
                    user.setNewPassword(userData.newPass)
                    user.info.updateOn = Date.now()
                    const {_id, ...rest} = user
                    await baseController.responseData(res,  baseController.update, {id: _id, newData: rest})
                    return
                }
            }
            baseController.responseData(res, null, userData)
        },    
        
        async dropUserByID (req, res) {
            
            if (!res.locals.permission){
                baseController.responseError(res, 250, 'Permission to delete user was deneied.')
                return
            }

            const userID = req.body.id

            if (checkingID(userID)) await baseController.responseData(res, baseController.delete, userID)
        }
    }
}