require('dotenv').config()

const express = require(`express`)
const mongoose = require(`mongoose`)
const bodyParser = require(`body-parser`)
const createError = require(`http-errors`)
const cookieSession = require('cookie-session')
const cors = require(`cors`)

const routeRouter = require(`./routes/main/rootRoute`)
const addProductRouter = require(`./routes/products/addProduct`)
const getAllProductsRouter = require(`./routes/products/getProduct`)
const deleteProductsRouter = require(`./routes/products/deleteProduct`)
const updateItemRouter = require(`./routes/products/patchProduct`)
const putItemRouter = require(`./routes/products/putProduct`)
const getOneProductRouter = require(`./routes/products/getOneProduct`)
const getProductByNameRouter = require(`./routes/products/getOneByName`)

const signUpRouter = require(`./routes/users/visitor/signup`)
const logInRouter = require(`./routes/users/visitor/login`)
const deleteUserRouter = require(`./routes/users/deleteUsers/deleteUser`)

const app = express()

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))
app.set('trust proxy', 1)
app.use(cookieSession({
  name: 'tangina',
  keys: [process.env.KEY_1, process.env.KEY_2]
}))

mongoose.connect(process.env.DB, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false})

// Products routes

app.use(routeRouter)
app.use(getOneProductRouter)
app.use(getProductByNameRouter)
app.use(getAllProductsRouter)
app.use(addProductRouter)
app.use(deleteProductsRouter)
app.use(updateItemRouter)
app.use(putItemRouter)

// Users routes

app.use(signUpRouter)
app.use(logInRouter)
app.use(deleteUserRouter)

// Admin routes

// Error Handlers

app.use((req, res, next) => {
    next(createError(404, `Not found`))
})

app.use((err, req, res, next) => {
    res.status(err.status || 500)
    return res.json({
        error : {
            status: err.status,
            msg: err.message
        }
    })
})

app.listen(process.env.PORT || 8000, () => {
    console.log(`Server is running`)
})