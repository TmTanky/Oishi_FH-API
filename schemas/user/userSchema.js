const mongoose = require(`mongoose`)

const registerSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: Boolean,
})

const newPerson = new mongoose.model(`user`, registerSchema)

module.exports = newPerson