require('dotenv').config()
const express = require('express')
const { connectDB } = require('./src/config/db')
const usersRoutes = require('./src/api/routes/user')
const movieRoutes = require('./src/api/routes/movie')
const directorRoutes = require('./src/api/routes/director')

const app = express()

connectDB()

app.use(express.json())

app.use('/api/v1/users', usersRoutes)
app.use('/api/v1/movies', movieRoutes)
app.use('/api/v1/directors', directorRoutes)

app.use('*', (req, res, next) => {
  return res.status(404).json('Route not found')
})

app.listen(3000, () => {
  console.log('The server is working at: http://localhost:3000')
})
