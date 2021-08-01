import BaseController from "./base_controller.js";
import categorySchema from "../database/models/category_model.js";

export default () => {
    const baseController = new BaseController('Category', categorySchema)

    const isCategoryNameExisted = async (categoryName) => {
        const category = await baseController.getData(baseController.getOneByCriteria, { name : categoryName })
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
        async getAll (req, res) {
            await baseController.responseData(res, baseController.getAll, {})
        },

        async getOneByName (req, res) {
            const categoryName = req.body.name
            if (categoryName === undefined || categoryName.length === 0) {
                baseController.responseError(res, 400, 'Length of category name must be greater than 0')
                return
            }
            await baseController.responseData(res, baseController.getOneByCriteria, { name: req.body.name })
        },

        async getOneByID (req, res) {
            const categoryID = req.body.id
            if (checkingID(categoryID)) await baseController.responseData(res, baseController.getOneByID, categoryID)
        },

        async create (req, res) {
            const categoryData = { name: req.body.name, desc: req.body.desc }
            if (await isCategoryNameExisted(categoryData.name)){
                baseController.responseError(res, 250, 'Category name already existed in the system, pls check again!!!')
            } else { 
                await baseController.responseData(res, baseController.create, categoryData)
            }
        },

        async update (req, res) {
            const newCategory = {id: req.body.id, name: req.body.name, desc: req.body.desc}
            if (checkingID(newCategory.id)) {
                const category = await baseController.getData(baseController.getOneByID, newCategory.id)
                if (newCategory.desc !== undefined){
                    category.desc = newCategory.desc
                    category.info = {
                        ...category.info,
                        updateOn: Date.now()
                    }
                }
                
                if (newCategory.name !== undefined){
                    if (await isCategoryNameExisted(newCategory.name)){
                        baseController.responseError(res, 250,'This category name already existed in the system, pls check again!!!')
                        return
                    } else {
                        category.name = newCategory.name
                        category.info = {
                            ...category.info,
                            updateOn: Date.now()
                        }
                    }
                } 

                const {_id, ...rest} = category
                await baseController.responseData(res, baseController.update, {id:_id, newData: rest})
            }
        },    
        
        async delete (req, res) {
            const categoryID = req.body.id

            if (checkingID(categoryID)){
                const category = await baseController.getData(baseController.getOneByID, categoryID)
                category.info = {
                    ...category.info,
                    isDelete: true,
                    isActive: false,
                    deleteOn: Date.now()
                }
                const {_id, ...rest} = category
                await baseController.responseData(res, baseController.update, {id: _id, newData: rest})
            }
        },

        async dropOneByID (req, res) {
            const categoryID = req.body.id
            if (checkingID(categoryID)) await baseController.responseData(res, baseController.delete, categoryID)
        }
    }
}