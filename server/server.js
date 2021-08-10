import express from 'express'
import cors from 'cors'
import user_route from './routes/user_route.js'
import recipe_route from './routes/recipe_route.js'
import category_route from './routes/category_route.js'

const server = express()

server.use(express.json())
server.use(cors())

server.use('/api/category', category_route)
server.use('/api/user', user_route)
server.use('/api/recipe', recipe_route)

export default server