import mongoose from 'mongoose'
import { STATION } from '../../constants/db_constants.js'
import general_info from './general_info.js'

const orderSchema = mongoose.Schema({
    order_no:{
        type: String,
        require: true
    },
    menus: {
        type: [Object],
        require: true,
    },
    tips:{
        type: Number,
        default: 0.00
    },
    total:{
        type: Number,
        require: true,
    },
    payment_no:{
        type: [Object]
    },
    station:{
        type: [String],
        require: true,
        enum: STATION,
    },
    info: {
        ...general_info
    },
})

export default orderSchema