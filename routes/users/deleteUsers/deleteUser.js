const express = require(`express`)
const mongoose = require(`mongoose`)
const jwt = require(`jsonwebtoken`)
const createError = require(`http-errors`)
const router = express.Router()

const user = require(`../../../schemas/user/userSchema`)

router.delete(`/oishi/api/v1/deleteuser/:id`, async (req, res, next) => {

    const queryUser = req.params.id

    
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

        const deletingUser = await user.findOneAndDelete({_id: queryUser})

        res.status(200).send({
            message: `Successfully Deleted`,
            data: deletingUser
        })
        
    } catch (err) {
        next(createError(err.status, err))
    }

})

module.exports = router

