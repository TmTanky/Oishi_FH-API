const express = require(`express`)
const jwt = require("jsonwebtoken")
// const JsonWebTokenError = require("jsonwebtoken")
const mongoose = require(`mongoose`)
const product = require(`../../schemas/product/producSchema`)

const router = express.Router()

router.get(`/oishi/api/v1/getproductsall`, async (req, res) => {

    let token

    if (req.headers.auth && req.headers.auth.startsWith(`Bearer`)) {
        token = req.headers.auth.split(` `)[1]
    }

    if (!token) {
        res.status(401).send({
            message: `Unauthorized`
        })
    }

    const newToken = await jwt.verify(token, process.env.JWT_SECRET_KEY)


    try {

        if (!newToken) {
            res.sendStatus(400).send({
                message: err
            })
        } else {
            if (newToken) {
                const items = await product.find()
 
                res.status(200).send({
                   message: `Successful`,
                   results: items.length,
                   data: items
                })
            } 

        }
        
    } catch (err) {
        res.sendStatus(400).send({
            message: err
        })
    }

})

module.exports = router