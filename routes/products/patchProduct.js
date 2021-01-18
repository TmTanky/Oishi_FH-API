const express = require(`express`)
const mongoose = require(`mongoose`)
const createError = require(`http-errors`)
const jwt = require(`jsonwebtoken`)
const router = express.Router()

const product = require(`../../schemas/product/producSchema`)

router.patch(`/oishi/api/v1/updateitem/:id`, async (req, res, next) => {

    const query = req.params.id

    try {

        let token

        if (req.headers.auth && req.headers.auth.startsWith(`Bearer`)) {
            token = req.headers.auth.split(` `)[1]
        }

        if (!token) {
            next(createError(401, `Please Log In first`))
            return
        }

        jwt.verify(token, process.env.JWT_SECRET_KEY)

        const updatedItem = await product.findOneAndUpdate({_id: query}, req.body) 

        if (!updatedItem) {
            next(createError(err.status, err))
        }

        res.status(200).send({
            messsage: `Success`,
            status: true,
            data: updatedItem
        })
        
    } catch (err) {
        next(createError(err.status, err))
    }
})



module.exports = router

// const {name, price, description} = req.body
    // const newPrice = parseInt(price)

    // const settingProduct =  product.findOneAndUpdate({_id: query}, { $set: {name: name, price: newPrice, description: description} }, () => {
    // })

    // try {
    //     const newUpdatedProduct = settingProduct.save()

    //     res.status(200).send({
    //         message: `Succesfully Updated`,
    //         data: newUpdatedProduct
    //     })
        
    // } catch (err) {
    //     res.status(400).send({
    //         message: err
    //     })
    // }