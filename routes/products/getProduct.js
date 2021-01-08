const express = require(`express`)
const mongoose = require(`mongoose`)
const product = require(`../../schemas/product/producSchema`)

const router = express.Router()

router.get(`/getproductsall`, async (req, res) => {

    try {
        const items = await product.find()

        res.status(200).send({
            message: `Successful`,
            results: items.length,
            data: items
        })
        
    } catch (err) {
        res.sendStatus(400).send({
            message: err
        })
    }

})

module.exports = router