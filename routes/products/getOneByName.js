const express = require(`express`)
const mongoose = require(`mongoose`)
const jwt = require(`jsonwebtoken`)
const createError = require(`http-errors`)
const router = express.Router()

const product = require(`../../schemas/product/producSchema`)

router.get(`/oishi/api/v1/getonebyname/:name`, async (req, res) => {

    const queryName = req.params.name

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

        const currentQuery = await product.findOne({name: queryName})
        
        res.status(200).json({
            message: `Success`,
            data: currentQuery
        })

    } catch (err) {
        next(createError(err.status, err.message))
    }

})

module.exports = router