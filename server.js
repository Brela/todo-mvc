const express = require('express')
const app = express()
const connectDB = require('./config/database')

require('dotenv').config({ path: './config/.env' })

connectDB()

app.use(express.static('client/public'));  // Serve the React app
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.listen(process.env.PORT, () => {
    console.log(`Server is running -- ${process.env.PORT}`)
})
