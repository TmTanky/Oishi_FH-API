const express = require(`express`)
const jwt = require("jsonwebtoken")
const JsonWebTokenError = require(`jsonwebtoken`)
const mongoose = require(`mongoose`)
const createError = require(`http-errors`)
const product = require(`../../schemas/product/producSchema`)

const router = express.Router()

router.get(`/oishi/api/v1/getproductsall`, async (req, res, next) => {

    // const token = req.session.ID

    // if (!token) {
    //     return next(createError(400, `No token`))
    // } else {
    //     console.log(token)
    // }

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
        
        const items = await product.find()

        res.status(200).json({
            message: `Successful`,
            results: items.length,
            data: items
        })
        
    } catch (err) {
         next(createError(err.status, err))
    }

})

module.exports = router