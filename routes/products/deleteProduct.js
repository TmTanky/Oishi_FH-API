const express = require(`express`)
const mongoose = require(`mongoose`)

const router = express.Router()

const product = require(`../../schemas/product/producSchema`)

router.delete(`/deleteproduct/:id`, async (req, res) => {

    const deletus = product.findOneAndDelete({_id: req.params.id})
    

    try {

        const deletedItem = await deletus
        
        res.status(200).send({
            message: `Successfully Deleted`,
            data: deletedItem
        })

    } catch (err) {
        res.status(400).send({
            message: err
        })
        
    }

})

module.exports = router