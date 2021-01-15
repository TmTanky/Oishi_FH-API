const express = require(`express`)
const mongoose = require(`mongoose`)
const bcrypt = require(`bcrypt`)
const router = express.Router()

const saltRounds = 10

const user = require(`../../../schemas/user/userSchema`)

router.post(`/oishi/api/v1/signup`, async (req, res) => {

    const {email, password} = req.body

    try {

        bcrypt.hash(password, saltRounds, async (err, hash) => {

            const newAccount = await new user ({
                email,
                password: hash
            })

            if (!newAccount.email || !newAccount.password) {
                res.status(400).send({
                    message: "Invalid input"
                }) 
            } else {
                newAccount.save()

                res.status(200).send({
                    message: `Successfully registered`,
                    data: newAccount
                })
            }

        })

    } catch (err) {
        res.status(400).send({
            message: err
        })
    }


})

module.exports = router