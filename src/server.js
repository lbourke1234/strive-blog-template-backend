import express from 'express'
import authorsRouter from './apis/authors/index.js'
import listEndPoints from 'express-list-endpoints'

const server = express()

const port = 3001

server.use(express.json())

server.use('/authors', authorsRouter)

server.listen(port, () => {
  console.table(listEndPoints(server))
  console.log('The server is now listening on port: ' + port)
})
