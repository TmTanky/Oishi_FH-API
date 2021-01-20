const express = require(`express`)
const mongoose = require(`mongoose`)
const jwt = require(`jsonwebtoken`)
const createError = require(`http-errors`)
const router = express.Router()

const product = require(`../../schemas/product/producSchema`)

router.get(`/oishi/api/v1/getoneproduct/:id`, async (req, res, next) => {

    const onlyItem = req.params.id

    let token

        if (req.headers.auth && req.headers.auth.startsWith(`Bearer`)) {
            token = req.headers.auth.split(` `)[1]
        }

        if (!token) {
            next(createError(401, `Please Log In first`))
            return
        }

    try {

        jwt.verify(token, process.env.JWT_SECRET_KEY)

        const queryItem = await product.findOne({_id: onlyItem})

        res.status(200).send({
            message: `Success`,
            data: queryItem
        })
        
    } catch (err) {
        next(createError(err.status, err.message))
    }

})

module.exports = router