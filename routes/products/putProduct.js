const express = require(`express`)
const mongoose = require(`mongoose`)
const router = express.Router()

const product = require(`../../schemas/product/producSchema`)

router.put(`/replaceitem/:id`, async (req, res) => {

    const query = req.params.id

    try {

        const putProduct = await product.findOneAndReplace({_id: query}, req.body)

        res.status(200).send({
            messsage: `Successfully overwrite product`,
            data: putProduct
        })
        
    } catch (err) {
        res.status(400).send({
            messsage: err
        })
    }


})

module.exports = router