const express = require(`express`)
const mongoose = require(`mongoose`)
const router = express.Router()

const product = require(`../../schemas/product/producSchema`)

router.patch(`/api/v1/updateitem/:id`, async (req, res) => {

    const query = req.params.id

    try {

        const updatedItem = await product.findOneAndUpdate({_id: query}, req.body) 

        if (!updatedItem) {
            throw Error(`Something happened`)
        }

        res.status(200).send({
            messsage: `Success`,
            status: true,
            data: updatedItem
        })
        
    } catch (err) {
        res.status(400).send({
            messsage: err,
            data: updatedItem
        })
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