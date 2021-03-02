const express = require(`express`)
const mongoose = require(`mongoose`)
const bcrypt = require(`bcrypt`)
const jwt = require(`jsonwebtoken`)
const createError = require(`http-errors`)
const { body, validationResult } = require('express-validator')

const router = express.Router()

const user = require(`../../../schemas/user/userSchema`)

router.post(`/oishi/api/v1/login`, async (req, res, next) => {

    const {email, password} = req.body

    if (!email || !password) {
        return next(createError(400, `Please fill all inputs.`))
    }

    try {

        const visitor = await user.findOne({email}, (err, foundUser) => {
            if (err) {
                return next(createError(400, `Account doesn't exist.`))
            } else if (foundUser) {
                if (foundUser) {
                    bcrypt.compare(password, foundUser.password, (err, result) => {
                        if (result) {

                            const token = jwt.sign({id: foundUser._id}, process.env.JWT_SECRET_KEY)

                            req.session.ID = token
                            res.status(200).json({
                                msg: `Successfully Logged In!`,
                                token,
                                user: foundUser
                            })
                        } else {
                             next(createError(404, `Invalid email or password`))
                        }
                    })
                } else {
                     next(createError(404, `Invalid email or password`))
                }
            } else {
                 next(createError(400, `Account doesn't exist.`))
            }
        })
        
    } catch (err) {
         next(createError(400, `Hehe`))
    }

})

module.exports = router

