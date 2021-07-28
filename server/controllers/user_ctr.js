import userSchema from "../database/models/user_model.js";
import BaseController from "./base_controller.js";

export default () => {
    const baseController = new BaseController('User', userSchema)

    const getData = async (res, func, data) => {
        let connection_on = null
        try{
            connection_on = baseController.getConnection()
            const { code, ...rest} = await func(data)
            res.status(code).json(rest)
        } catch (error){
            console.log('Error - User controller: ', error);
        } finally {
            if (connection_on !== null) connection_on.close()
        }
    }

    const isUsernameExisted = async (username) => {
        baseController.getConnection()
        const isExisted = await baseController.getModel().checkUsername(username)
        return isExisted
    }

    return {
        async getAll (req, res) {
            await getData(res, baseController.getAll, {})
        },

        async getOneByUsername (req, res) {
            await getData(res, baseController.getOneByCriteria, {username: req.body.username})
        },

        async getOneByID (req, res) {
            await getData(res, baseController.getOneByCriteria, {_id: req.body.id})
        },

        async create (req, res) {
            const userData = { username: req.body.name, password: req.body.desc }
            if (await isUsernameExisted(userData.username)){
                getData(res, () => ({
                    code: 250, data:{}, 
                    msg:'Username already existed in the system, pls check again!!!'
                }),{})
            } else { 
                await getData(res, baseController.create, userData)
            }
        },

        async update (req, res) {
            let isNameChangedAndExisted = false

            const user = await baseController.getOneByCriteria({_id: req.body.id})

            if (req.body.password !== undefined){
                user.desc = req.body.password
                user.info = {
                    ...user.info,
                    updateOn: Date.now()
                }
            }

            if (req.body.username !== undefined){
                if (await isCategoryNameExisted(req.body.username)){
                    this.getData(res, ()=>({code: 250, data:{}, msg:'This category name already existed in the system, pls check again!!!'}),{})
                    isNameChangedAndExisted = true
                } else {
                    user.username = req.body.username
                    user.info = {
                        ...user.info,
                        updateOn: Date.now()
                    }
                }
            } 

            const {_id, ...rest} = user
            if (!isNameChangedAndExisted) this.getData(res, this.baseController.update, {id: _id, newData: rest})
        },    
        
        async delete (req, res) {
            await getData(res, this.baseController.delete, req.body.id)
        }
    }
}