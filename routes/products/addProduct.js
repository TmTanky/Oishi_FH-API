const express = require(`express`)
const mongoose = require(`mongoose`)
const router = express.Router()

const product = require(`../../schemas/product/producSchema`)

router.post(`/oishi/api/v1/addproduct`, async (req, res) => {

    const addProduct = new product(req.body)

    try {
        
        const newProduct = await addProduct.save()
        
        res.status(201).send({
            message: `Successfully Added`,
            data: newProduct
        })
        
    } catch (err) {
        res.status(400).send({
            message: `Failed to add product`,
            error: err
        })
    }
})

module.exports = router