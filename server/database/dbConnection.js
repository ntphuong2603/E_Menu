import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const db_uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.v7oxv.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
}

export default async function(){
    await mongoose.connect(db_uri, {...options})

    // mongoose.connection.on('connected', () => {
    //     console.log(`Mongoose default connection is open to ${db_uri}`)
    // })

    mongoose.connection.on('error', (err)=>{
        console.log(`Mongoose default connection has occured ${err} error`)
    })

    // mongoose.connection.on('disconnected', ()=>{
    //     console.log("Mongoose default connection is disconnected")
    // })

    process.on('SIGINT', () => {
        mongoose.connection.close(()=>{
            // console.log('Mongoose default connection is disconnected due to application termination')
            process.exit(0)
        })
    })

    return mongoose.connection
}