import mongoose from 'mongoose'
import general_info from './general_info.js'

const STATION = ['sushi-bar', 'kitchen - deep fryer', 'kitchen - cooking']

const recipeSchema = mongoose.Schema({
    name:{
        type: String,
        require: true,
        index: {
            unique: true,
        }
    },
    price:{
        type: Number,
        require: true,
    },
    categoryID:{
        type: String,
        require: true,
    },
    picLocation:{
        type: [Object]
    },
    station:{
        type: [String],
        enum: STATION,
        default: [STATION[0]]
    },
    desc:{
        type: String,
    },
    info: {
        ...general_info
    },
})

recipeSchema.statics.checkRecipeName = async function(recipeName){
    const recipe = await this.findOne({name:recipeName})
    return !!recipe
}

export default recipeSchema