const express = require(`express`)
const mongoose = require(`mongoose`)
const bcrypt = require(`bcrypt`)
const jwt = require(`jsonwebtoken`)
const router = express.Router()
const { body, validationResult } = require('express-validator')

const saltRounds = 10

const user = require(`../../../schemas/user/userSchema`)

router.post(`/oishi/api/v1/signup`, body(`email`).isEmail().withMessage(`Email must be valid.`), body(`password`).isLength({min:5}).withMessage(`Password must be 5 characters long.`), async (req, res) => {

    const {email, password} = req.body

    try {

        const errors = validationResult(req);
             if (!errors.isEmpty()) {
             return res.status(400).json({ errors: errors.array() });
            }

        bcrypt.hash(password, saltRounds, async (err, hash) => {

            const newAccount = await new user({
                email,
                password: hash
            })

            if (!newAccount.email || !newAccount.password) {
                res.status(400).send({
                    message: "Invalid input"
                }) 
            } else {
                newAccount.save()

                const token = jwt.sign({id: newAccount._id}, process.env.JWT_SECRET_KEY,{ expiresIn: process.env.JWT_EXPIRES_IN})

                res.status(200).send({
                    message: `Successfully registered`,
                    token,
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



// router.post('/oishi/api/v1/signup',body('username').isEmail(),body('password').isLength({ min: 5 }), (req, res) => {
    
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     bcrypt.hash(password, saltRounds, async (err, hash) => {

//         const newAccount = await new user({
//             email,
//             password: hash
//         })


        

//         if (!newAccount.email || !newAccount.password) {
//             res.status(400).send({
//                 message: "Invalid input"
//             }) 
//         } else {
//             newAccount.save()

//             const token = jwt.sign({id: newAccount._id}, process.env.JWT_SECRET_KEY,{ expiresIn: process.env.JWT_EXPIRES_IN})

//             res.status(200).send({
//                 message: `Successfully registered`,
//                 token,
//                 data: newAccount
//             })
//         }

//         const errors = validationResult(req);
//          if (!errors.isEmpty()) {
//          return res.status(400).json({ errors: errors.array() });
//         }

//     })
//   },
// );