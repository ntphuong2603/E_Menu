import mongoose from 'mongoose'
import general_info from './general_info.js'
import bcrypt from 'bcrypt'
import jsonwebtoken from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const userSchema = mongoose.Schema({
    username:{
        type: String,
        require: true,
        index: {
            unique: true,
        }
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

userSchema.methods.checkPassword = function(password) {
    const match = bcrypt.compareSync(password,this.password)
    return match
}

userSchema.methods.setNewPassword = function(newPassword){
    const salt = bcrypt.genSaltSync(16)
    this.password = bcrypt.hashSync(newPassword, salt)
}

userSchema.methods.generateToken = function(){
    const user = this
    const userObj = {
        id: user._id.toHexString(),
        username: user.username,
        userInfo: user.info,
    }
    const token = jsonwebtoken.sign(userObj, process.env.JWT_SECRET, { expiresIn: '1h'})
    return token
}

userSchema.pre('save', function(){
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(16))
})

// userSchema.pre('save', function(next){
//     // const user = this
//     if (this.isModified('password')){
//         const salt = bcrypt.genSaltSync(16)
//         this.password = bcrypt.hashSync(this.password, salt)
//     }
//     next()
//     // this.password = bcrypt.hashSync(this.password, bcrypt.genSalt(16))
//     // const user = this
//     // const salt = bcrypt.genSaltSync(16)
//     // const hash = bcrypt.hashSync(user.password, salt)
//     // user.password = hash
// })

export default userSchema