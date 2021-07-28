import mongoose from 'mongoose'
import general_info from './general_info.js'
import bcrypt from 'bcrypt'

const userSchema = mongoose.Schema({
    username:{
        type: String,
        require: true,
        unique: true,
    },
    password:{
        type: String,
        require: true,
    },
    info: {
        ...general_info
    },
})

userSchema.statics.checkUsername = async function(username){
    const user = await this.findOne({ username : username })
    return !!user
}

userSchema.pre('save', function(){
    const user = this
    const salt = bcrypt.genSaltSync(16)
    const hash = bcrypt.hashSync(user.password, salt)
    user.password = hash
})

export default userSchema