import Category from "../database/models/category-model"
import mongodb from "../database/mongodb"

export default function baseController(){

    // const db = mongodb()

    const controller = {
        async getAll(req, res){
            try {
                const db = mongodb()
                console.log('2', req.body);
                const cats = await Category.find()
                console.log('3', cats);
                return res.status(200).json({
                    data: cats,
                })
            } catch (error){
                return res.status(400).json({msg:error})
            }
            // } finally {
            //     db.close()
            // }
        }
    }

    // async function getAll(req, res){
    //     try {
    //         console.log('2', req.body);
    //         const db = mongodb()
    //         const cats = await Category.find()
    //         res.status(200).json({
    //             data: cats,
    //         })
    //     } catch (error){
    //         res.status(400).json({msg:error})
    //     } finally {
    //         db.close()
    //     }
    // }

    // return { getAll }
    // async function getOne(){

    // }
    // async function create(){

    // }
    // async function update(){

    // }
    // async function remove(){

    // }

    return controller
    // return { 
    //     getAll : getAll,
    //     getOne : getOne,
    //     create : create, 
    //     update : upadte, 
    //     remove : remove 
    // }
}