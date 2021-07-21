import mongoose from 'mongoose'
import generalInfo from './generalInfo'

const categorySchema = mongoose.Schema({
    name:{
        type: String,
        require: true,
    },
    desc:{
        type:String,
    },
    info: { ...generalInfo }
})

categorySchema.statics.checkingName = async function (categoryName){
    const cat = await this.findOne({name:categoryName})
    return !!cat
}

const Category = mongoose.model('Category', categorySchema)

export default Category