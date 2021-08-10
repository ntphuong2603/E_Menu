import recipeSchema from "../database/models/recipe_model.js";
import BaseController from "./base_controller.js";

export default () => {
    const baseController = new BaseController('Recipe', recipeSchema)

    const isRecipeNameExisted = async (recipeName) => {
        const recipe = await baseController.getData(baseController.getOneByCriteria, { name : recipeName })
        return !!recipe
    }

    const checkingID = (recipeID) => {
        if (recipeID === undefined || recipeID.length === 0) {
            baseController.responseError(res, 400, 'Length of ID must be validated')
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
                baseController.responseError(res, 400, 'Length of recipe name must be greater than 0')
                return
            }
            await baseController.responseData(res, baseController.getOneByCriteria, { name: req.body.name })
        },

        async getOneByID (req, res) {
            const categoryID = req.body.id
            if (checkingID(categoryID)) await baseController.responseData(res, baseController.getOneByID, categoryID)
        },

        async create (req, res) {
            const recipeData = { name: req.body.name, desc: req.body.desc, price: req.body.price}
            if (await isRecipeNameExisted(recipeData.name)){
                baseController.responseError(res, 250, 'Recipe name already existed in the system, pls check again!!!')
            } else { 
                await baseController.responseData(res, baseController.create, recipeData)
            }
        },

        async update (req, res) {
            const newRecipe = {
                id: req.body.id, name: req.body.name, 
                price: req.body.price, desc: req.body.desc,
                station: req.body.station,
            }

            if (checkingID(newRecipe.id)) {
                const recipe = await baseController.getData(baseController.getOneByID, newRecipe.id)

                if (newRecipe.name !== undefined){
                    if (await isRecipeNameExisted(newRecipe.name)){
                        baseController.responseError(res, 250,'This recipe name already existed in the system, pls check again!!!')
                        return
                    } else {
                        recipe.name = newRecipe.name
                    }
                } 

                recipe.desc = newRecipe.desc === undefined ? recipe.desc : newRecipe.desc
                recipe.station = newRecipe.station === undefined ? recipe.station : newRecipe.station
                recipe.price = newRecipe.price === undefined ? recipe.price : newRecipe.price
                recipe.info = {
                    ...recipe.info,
                    updateOn: Date.now()
                }

                const {_id, ...rest} = recipe
                await baseController.responseData(res, baseController.update, {id:_id, newData: rest})
            }
        },    

        async updatePicture(req, res) {
            const newRecipe = {
                id: req.body.id,
                selection: req.body.selection,
                picLink: req.body.link,
            }

            if (checkingID(newRecipe.id)) {
                const recipe = await baseController.getData(baseController.getOneByID, newRecipe.id)

                const selectionList = []

                recipe.picLocation.forEach(element => {
                    if (element.selection === newRecipe.pic.selection) {
                        element.picLink = newRecipe.picLink
                    }
                    selectionList.push(element.selection)
                });


                if (!selectionList.includes(newRecipe.selection)) {
                    recipe.picLocation.push({
                        selection: newRecipe.selection,
                        picLink: newRecipe.picLink
                    })
                }

                recipe.info = {
                    ...recipe.info,
                    updateOn: Date.now()
                }

                const {_id, ...rest} = recipe
                await baseController.responseData(res, baseController.update, {id:_id, newData: rest})
            }
        },
        
        async delete (req, res) {
            const recipeID = req.body.id

            if (checkingID(recipeID)){
                const recipe = await baseController.getData(baseController.getOneByID, recipeID)
                recipe.info = {
                    ...recipe.info,
                    isDelete: true,
                    isActive: false,
                    deleteOn: Date.now()
                }
                const {_id, ...rest} = recipe
                await baseController.responseData(res, baseController.update, {id: _id, newData: rest})
            }
        },

        async dropOneByID (req, res) {
            const recipeID = req.body.id
            if (checkingID(recipeID)) await baseController.responseData(res, baseController.delete, recipeID)
        }
    }
}