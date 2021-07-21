import mongoose from 'mongoose'

require('dotenv').config()

const mongooseUri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.v7oxv.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
}

export default function(){
    mongoose.connect(mongooseUri, {...options})

    mongoose.connection.on('connected', () => {
        console.log(`Mongoose default connection is open to ${mongooseUri}`)
    })

    mongoose.connection.on('error', (err)=>{
        console.log(`Mongoose default connection has occured ${err} error`)
    })

    mongoose.connection.on('disconnected', ()=>{
        console.log("Mongoose default connection is disconnected")
    })

    process.on('SIGINT', () => {
        mongoose.connection.close(()=>{
            console.log('Mongoose default connection is disconnected due to application termination')
            process.exit(0)
        })
    })

    return mongoose.connection
}