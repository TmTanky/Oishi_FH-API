const express = require(`express`)
const mongoose = require(`mongoose`)
const bcrypt = require(`bcrypt`)
const jwt = require(`jsonwebtoken`)
const createError = require(`http-errors`)
const router = express.Router()
const { body, validationResult } = require('express-validator')

const saltRounds = 10

const user = require(`../../../schemas/user/userSchema`)

router.post(`/oishi/api/v1/signup`, async (req, res, next) => {

    const {email, password, name} = req.body

    try {

        if (!email || !password || !name) {
            return next(createError(400, `Please input all fields.`))
        }

        if (password.length <= 4) {
            return next(createError(400, `Password must be 5 or more characters.`))
        }

        const hash = await bcrypt.hash(password, saltRounds)

        const newAccount = await new user({
            name,
            email,
            password: hash
        })

        const savingAccount = await newAccount.save()     
        const token = jwt.sign({id: newAccount._id}, process.env.JWT_SECRET_KEY)

        res.status(200).json({
            msg: `Successfully registered`,
            token,
            user: newAccount
        })

    } catch (err) {

        if (err.code === 11000 || err.keyPattern.email === 1) {
            return next(createError(400, `Email already exist.`))
        }

        next(createError(404, err))
    }


})

module.exports = router


