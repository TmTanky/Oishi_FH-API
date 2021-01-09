require('dotenv').config()

const express = require(`express`)
const mongoose = require(`mongoose`)
const bodyParser = require(`body-parser`)

const routeRouter = require(`./routes/main/rootRoute`)
const addProductRouter = require(`./routes/products/addProduct`)
const getAllProductsRouter = require(`./routes/products/getProduct`)
const deleteProductsRouter = require(`./routes/products/deleteProduct`)
const updateItemRouter = require(`./routes/products/patchProduct`)
const putItemRouter = require(`./routes/products/putProduct`)

const app = express()
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))

mongoose.connect(`${process.env.DB}`, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false})

app.use(routeRouter)
app.use(addProductRouter)
app.use(getAllProductsRouter)
app.use(deleteProductsRouter)
app.use(updateItemRouter)
app.use(putItemRouter)

app.listen(process.env.PORT || 8000, () => {
    console.log(`Server is running`)
})