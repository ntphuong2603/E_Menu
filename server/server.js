import express from 'express'
import cors from 'cors'
import category_api from './routes/category_route.js'

const server = express()

server.use(express.json())
server.use(cors())

server.use('/api/category', category_api)

export default server