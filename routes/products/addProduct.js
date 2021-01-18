const express = require(`express`)
const jwt = require("jsonwebtoken")
const mongoose = require(`mongoose`)
const createError = require(`http-errors`)
const { body, validationResult } = require('express-validator')
const router = express.Router()

const product = require(`../../schemas/product/producSchema`)

router.post(`/oishi/api/v1/addproduct`, async (req, res, next) => {

    const addProduct = new product(req.body)

    try {

        let token

        if (req.headers.auth && req.headers.auth.startsWith(`Bearer`)) {
           token = req.headers.auth.split(` `)[1]
        }

        if (!token) {
            res.status(401).send({
            message: `Unauthorized`
            })
        }

        jwt.verify(token, process.env.JWT_SECRET_KEY)

        const newProduct = await addProduct.save()

        console.log(newProduct)
        
        if (!newProduct) {
            next(createError(400,`Input product details`))
            return
        } else {
            res.status(201).send({
                message: `Successfully Added`,
                data: newProduct
            })
        }

     } catch (err) {
        next(createError(400, err))
     }
})

module.exports = router