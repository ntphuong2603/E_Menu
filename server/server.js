import express from 'express'
import cors from 'cors'
import category_api from './routes/category_route.js'
import user_route from './routes/user_route.js'

const server = express()

server.use(express.json())
server.use(cors())

server.use('/api/category', category_api)
server.use('/api/user', user_route)

export default server