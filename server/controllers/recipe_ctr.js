import { SELECTION } from "../constants/db_constants.js";
import recipeSchema from "../database/models/recipe_model.js";
import BaseController from "./base_controller.js";

export default () => {
    const baseController = new BaseController('Recipe', recipeSchema)

    const isRecipeNameExisted = async (recipeName) => {
        const recipe = await baseController.getData(baseController.getOneByCriteria, { name : recipeName })
        return !!recipe
    }

    return {
        async getAll (req, res) {
            await baseController.responseData(res, baseController.getAll)
        },

        async getAllByCategory (req, res) {
            const categoryID = req.body.categoryID
            if (baseController.checkingID(res, categoryID)) await baseController.responseData(res, baseController.getAll, {categoryID: categoryID})
        },

        async getOneByName (req, res) {
            const recipeName = req.body.name
            if (recipeName === undefined || recipeName.length === 0) {
                baseController.responseError(res, 400, 'Length of recipe name must be greater than 0')
                return
            }
            await baseController.responseData(res, baseController.getOneByCriteria, { name: recipeName })
        },

        async getOneByID (req, res) {
            const recipeID = req.body.id
            if (baseController.checkingID(res, recipeID)) await baseController.responseData(res, baseController.getOneByID, recipeID)
        },

        async create (req, res) {
            const recipeData = { 
                name: req.body.name, desc: req.body.desc, 
                price: req.body.price,
                categoryID: req.body.categoryID,
            }
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
                categoryID: req.body.categoryID,
            }

            if (baseController.checkingID(res, newRecipe.id)) {
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
                recipe.categoryID = newRecipe.categoryID === undefined ? recipe.categoryID : newRecipe.categoryID
                
                recipe.info = {
                    ...recipe.info,
                    updateOn: Date.now()
                }

                const {_id, ...rest} = recipe
                await baseController.responseData(res, baseController.update, {id:_id, newData: rest})
            }
        },    

        async updatePicture(req, res) {

            if (!SELECTION.includes(req.body.selection)){
                baseController.responseError(res, 250, 'Wrong selection, pls re-check!!!')
                return
            }

            const newPicture = {
                selection: req.body.selection,
                picLink: req.body.picLink,
            }

            const recipeID = req.body.id

            // console.log('New:', newRecipe);
            if (baseController.checkingID(res, recipeID)) {
                const recipe = await baseController.getData(baseController.getOneByID, recipeID)

                const selectionList = []
                // console.log('Before:', recipe.picLocation);
                
                if (recipe.picLocation.length === 0){
                    recipe.picLocation.push(newPicture)
                } else {
                    recipe.picLocation.forEach(element => {
                        if (element.selection === newPicture.selection) {
                            element.picLink = newPicture.picLink
                        }
                        selectionList.push(element.selection)
                    })

                    if (!selectionList.includes(newPicture.selection)) {
                        recipe.picLocation.push(newPicture)
                    }
                }

                recipe.info = {
                    ...recipe.info,
                    updateOn: Date.now()
                }

                // console.log('After:', recipe.picLocation);
                const {_id, ...rest} = recipe
                await baseController.responseData(res, baseController.update, {id:_id, newData: rest})
            }
        },
        
        async delete (req, res) {
            const recipeID = req.body.id

            if (baseController.checkingID(res, recipeID)){
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
            if (baseController.checkingID(res, recipeID)) await baseController.responseData(res, baseController.delete, recipeID)
        }
    }
}