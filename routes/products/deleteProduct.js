const express = require(`express`)
const mongoose = require(`mongoose`)
const createError = require(`http-errors`)
const jwt = require(`jsonwebtoken`)
const router = express.Router()

const product = require(`../../schemas/product/producSchema`)

router.delete(`/oishi/api/v1/deleteproduct/:id`, async (req, res, next) => {

    const deletus = product.findOneAndDelete({_id: req.params.id})

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

        const deletedItem = await deletus

        if (!deletedItem) {
            next(createError(err.status, `Not found`))
        } else {
            res.status(200).send({
                message: `Successfully Deleted`,
                data: deletedItem
            })
        }
    
    } catch (err) {
        next(createError(err.status, err))
    }

})

module.exports = router