import mongoose from 'mongoose'
import general_info from './general_info.js'

const categorySchema = mongoose.Schema({
    name:{
        type: String,
        require: true,
        unique: true,
    },
    desc:{
        type: String,
    },
    info: {
        ...general_info
    },
})

categorySchema.statics.checkCategoryName = async function(categoryName){
    const cat = await this.findOne({name:categoryName})
    return !!cat
}

export default categorySchema