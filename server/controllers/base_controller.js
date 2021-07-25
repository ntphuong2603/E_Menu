import mongoose from "mongoose";

export default class BaseController {
    constructor(modelName, modelSchema){
        this.result = {
            code: 400,
            data: {},
            msg:''
        }

        if (modelSchema !== null){
            this.model = mongoose.model(modelName, modelSchema)
        }
    }

    getModel = () => {
        return this.model
    }

    setModel = (modelName, modelSchema) => {
        this.model = mongoose.model(modelName, modelSchema)
    }

    getAll = async () => {
        try {
            this.result.data = await this.model.find()
            this.result.code = 200
        } catch (error){
            this.result.msg = error
        } 
        return this.result
    }

    getOneByCriteria = async (criteria) => {
        try {
            this.result.data = await this.model.findOne(criteria)
            this.result.code = 200
        } catch (error){
            this.result.msg = error
        } finally {
            return this.result
        }
    }

    getOneByID = async (id) => {
        try {
            this.result.data = await this.model.findById({_id:id})
            this.result.code = 200
        } catch (error){
            this.result.msg = error
        } finally {
            return this.result
        }
    }

    create = async (modelData) => {
        try{
            console.log('Base controller: ', modelData);
            this.result.data = await this.model.create(modelData)
            console.log('Data:', this.result.data);
            this.result.code = 200
        } catch (error){
            // console.log(error);
            this.result.msg = error
        } finally {
            console.log('Result:', this.result);
            return this.result
        }
    }
    
    update = async ({id, newData}) => {
        try{
            this.result.data = await this.model.findByIdAndUpdate({_id: id}, newData, {new: true})
            this.result.code = 200
        } catch (error){
            this.result.msg = error
        } finally {
            return this.result 
        }
    }

    delete = async (id) => {
        try{
            this.result.data = await this.model.findByIdAndDelete({_id: id})
            this.result.code = 200
        } catch (error){
            this.result.msg = error
        } finally {
            return this.result 
        }
    }
}