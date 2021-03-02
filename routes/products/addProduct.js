const express = require(`express`)
const jwt = require("jsonwebtoken")
const mongoose = require(`mongoose`)
const createError = require(`http-errors`)
const router = express.Router()

const product = require(`../../schemas/product/producSchema`)

router.post(`/oishi/api/v1/addproduct`, async (req, res, next) => {

    const {name, price, description} = req.body

    if (!name, !price, !description) {
        next(createError(400, `Please fill all inputs`))
        // return console.log(`Hello`)
    }

    try {

        let token

        if (req.headers.auth && req.headers.auth.startsWith(`Bearer`)) {
           token = req.headers.auth.split(` `)[1]
        }

        if (!token) {
            res.status(401).json({
            message: `Unauthorized`
            })
        }

        const addProduct = new product({
            name,
            price,
            description
        })

        jwt.verify(token, process.env.JWT_SECRET_KEY)

        const newProduct = await addProduct.save()

        console.log(newProduct)
        
        if (!newProduct) {
            next(createError(400,`Input product details`))
            return
        } else {
            res.status(201).json({
                message: `Successfully Added`,
                data: newProduct
            })
        }

     } catch (err) {

        if (err.code === 11000 || err.keyPattern.name === 1) {
            return next(createError(400, `Product name must be unique.`))
        }

        next(createError(400, err))
     }
})

module.exports = router