export default {
    isActive:{
        type: Boolean,
        default: true,
    },
    createOn:{
        type: Date,
        default: Date.now(),
    },
    createBy:{
        type:String,
        // require: true,
        // default:"not-yet-setup"
    },
    updateOn:{
        type:Date,
        // default: Date.now(),
    },
    updateBy:{
        type:String,
        // default: 'not-yet-update'
    },
    deleteOn:{
        type:Date,
    },
    deleteBy:{
        type:String,
        // require:true,
        // default:"not-yet-setup"
    },
    isDelete:{
        type:Boolean,
        default: null,
    }
}
