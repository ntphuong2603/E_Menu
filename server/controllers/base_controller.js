import mongoose from "mongoose";
import dbConnection from "../database/dbConnection.js";

export default class BaseController {
    #connection = null
    #model = null
    #result = null

    constructor(modelName, modelSchema){
        this.#result = { code: 400, data: {}, msg:'' }
        this.#connection = null
        if (modelSchema !== null) this.#model = mongoose.model(modelName, modelSchema)
        
    }

    getModel = () => {
        return this.#model
    }

    setModel = (modelName, modelSchema) => {
        this.#model = mongoose.model(modelName, modelSchema)
    }

    #openConnection = async () => {
        if (this.#connection === null || this.#connection.readyState !== 1){
            this.#connection = await dbConnection()
        }
        return this.#connection
    }

    #closeConnection = async () => {
        if (this.#connection.readyState !== 0){
            await this.#connection.close()
        }
        return this.#connection
    }

    responseError (res, code, msg) {
        res.status(code).json({msg: msg})
    }

    async getData (func, data) {
        try{
            await this.#openConnection()
            return (await func(data)).data
        } catch (error){
            console.log('Error - Category controller: ', error);
        } finally {
            await this.#closeConnection()
        }
    }

    async responseData (res, func = null, data, msg = '') {
        try{
            if (func === null){
                res.status(200).json({data:data, msg:msg})
            } else {
                await this.#openConnection()
                console.log('Func:', func);
                const { code, ...rest} = await func(data)
                // console.log('Data:', rest);
                res.status(code).json(rest)
            }
        } catch (error){
            console.log('Error - Category controller: ', error);
        } finally {
            await this.#closeConnection()
        }
    }

    getAll = async () => {
        try {
            this.#result.data = await this.#model.find()
            this.#result.code = 200
        } catch (error){
            this.#result.msg = error
        } 
        return this.#result
    }

    getOneByCriteria = async (criteria) => {
        try {
            this.#result.data = await this.#model.findOne({...criteria})
            this.#result.code = 200
        } catch (error){
            this.#result.msg = error
        } finally {
            return this.#result
        }
    }

    getOneByID = async (id) => {
        try {
            this.#result.data = await this.#model.findById(id)
            this.#result.code = 200
        } catch (error){
            this.#result.msg = error
        } finally {
            return this.#result
        }
    }

    create = async (modelData) => {
        try{
            this.#result.data = await this.#model.create(modelData)
            this.#result.code = 200
        } catch (error){
            this.#result.msg = error
        } finally {
            return this.#result
        }
    }
    
    update = async ({id, newData}) => {
        try{
            this.#result.data = await this.#model.findByIdAndUpdate({_id: id}, newData, {new: true})
            this.#result.code = 200
        } catch (error){
            this.#result.msg = error
        } finally {
            return this.#result 
        }
    }

    delete = async (id) => {
        try{
            this.#result.data = await this.#model.findByIdAndDelete({_id: id})
            this.#result.code = 200
        } catch (error){
            this.#result.msg = error
        } finally {
            return this.#result 
        }
    }
}