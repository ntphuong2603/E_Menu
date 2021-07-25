import dbConnection from "../database/dbConnection.js";
import BaseController from "./base_controller.js";
import categorySchema from "../database/models/category_model.js";

export default class CategoryController {
    constructor(){
        this.baseController = new BaseController('Category', categorySchema)
        this.connection = null
    }

    getConnection = () => {
        if (this.connection === null){
            this.connection = dbConnection()
        }
        return dbConnection()
    }

    isCategoryNameExisted = async (categoryName) => {
        this.getConnection()
        const isExisted = await this.baseController.getModel().checkCategoryName(categoryName)
        return isExisted
    }

    getOneByID = async (id) => {
        this.getConnection()
        const { data } = await this.baseController.getOneByID(id)
        return data
    }

    getData = async (res, func, data) => {
        const connection_on = this.getConnection()
        try{
            console.log('func getData: ', func);
            const connection_on = dbConnection()
            const { code, ...rest} = await func(data)
            connection_on.close()
            res.status(code).json(rest)
        } catch (error){
            console.log('Error - Category controller: ', error);
        } finally {
            connection_on.close()
        }
    } 

    getAll  = async (req, res) => {
        await this.getData(res, this.baseController.getAll, {})
    }

    getOneByName = async (req, res) => {
        await this.getData(res, this.baseController.getOneByCriteria, {name: req.body.name})
    }

    create = async (req, res) => {
        const categoryData = {
            name: req.body.name,
            desc: req.body.desc
        }
        if (await this.isCategoryNameExisted(categoryData.name)){
            this.getData(res, () => ({
                code: 250, data:{}, 
                msg:'This category name already existed in the system, pls check again!!!'
            }),{})
        } else { 
            await this.getData(res, this.baseController.create, categoryData)
        }
    }

    update = async (req, res) => {
        let isNameChangedAndExisted = false
        const category = await this.getOneByID(req.body.id)
        if (req.body.desc !== undefined){
            category.desc = req.body.desc
            category.info = {
                ...category.info,
                updateOn: Date.now()
            }
        }
        if (req.body.name !== undefined){
            if (await this.isCategoryNameExisted(req.body.name)){
                this.getData(res, ()=>({code: 250, data:{}, msg:'This category name already existed in the system, pls check again!!!'}),{})
                isNameChangedAndExisted = true
            } else {
                category.name = req.body.name
                category.info = {
                    ...category.info,
                    updateOn: Date.now()
                }
            }
        } 
        const {_id, ...rest} = category
        if (!isNameChangedAndExisted) this.getData(res, this.baseController.update, {id: _id, newData: rest})
    }

    delete = async (req, res) => {
        const category = await this.getOneByID(req.body.id)
        category.info = {
            ...category.info,
            isDelete: true,
            isActive: false,
            deleteOn: Date.now()
        }
        const {_id, ...rest} = category
        await this.getData(res, this.baseController.update, {id: _id, newData: rest})
    }

    dropOneByID = async (req, res) => {
        await this.getData(res, this.baseController.delete, req.body.id)
    }
}