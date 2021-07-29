import userSchema from "../database/models/user_model.js";
import BaseController from "./base_controller.js";
import dotenv from 'dotenv'

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

    return {
        async getAllUsers (req, res) {
            await baseController.responseData(res, baseController.getAll, {})
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
            const userData = { 
                username: req.body.username, 
                password: req.body.password,
            }
            
            if (await isUsernameExisted(userData.username)){
                baseController.responseError(res, 250, 'Username already existed in the system, pls check again!!!')
            } else { 
                await baseController.responseData(res, baseController.create, userData)
            }
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
        
        // async delete (req, res) {
        //     const userInfo = res.locals.userInfo

        //     if (checkingID(categoryID)){
        //         const category = await baseController.getData(baseController.getOneByID, categoryID)
        //         category.info = {
        //             ...category.info,
        //             isDelete: true,
        //             isActive: false,
        //             deleteOn: Date.now()
        //         }
        //         const {_id, ...rest} = category
        //         await baseController.responseData(res, baseController.update, {id: _id, newData: rest})
        //     }
        // },

        // async dropUserByID (req, res) {
        //     const userID = req.body.id
        //     if (checkingID(userID)) await baseController.responseData(res, baseController.delete, userID)
        // }
    }
}