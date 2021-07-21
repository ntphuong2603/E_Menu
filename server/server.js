import express from 'express'
import cors from 'cors'

const server = express()
server.use(express.json())
server.use(cors())

// import auth from './middleware/auth'
// server.use(auth.checkToken)

// import userApi from './routes/user-api'
// server.use('/api/user', userApi)

import categoryApi from './routes/category-api'
server.use('/api/category', categoryApi)

export default server