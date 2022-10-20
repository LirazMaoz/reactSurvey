require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const authRoutes = require('./routes/authRoutes')
const PORT = process.env.PORT_API || 5001

const app = express()
app.use(cors())
app.use(express.json())

// Register the routes
app.use('/api/auth', authRoutes)

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
  })
  .catch((err) => {
    console.log('Database connection was failed. Server is not started!')
    console.error(err)
  })
