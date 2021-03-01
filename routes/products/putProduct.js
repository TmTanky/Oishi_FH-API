const express = require(`express`)
const mongoose = require(`mongoose`)
const createError = require(`http-errors`)
const jwt = require(`jsonwebtoken`)
const router = express.Router()

const product = require(`../../schemas/product/producSchema`)

router.put(`/oishi/api/v1/replaceitem/:id`, async (req, res, next) => {

    const query = req.params.id

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

        const putProduct = await product.findOneAndReplace({_id: query}, req.body) 
        // Still not fix i want not to validate the data before saving

        res.status(200).json({
            messsage: `Successfully overwrite product`,
            data: putProduct
        })
        
    } catch (err) {
        next(createError(err.status, err))
    }


})

module.exports = router

