import express from 'express'
import user from './src/routes/user'
import product from './src/routes/product'
require('dotenv').config()

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/user', user)
app.use('/product', product)

app.listen(process.env.PORT)