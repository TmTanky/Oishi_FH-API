const mongoose = require(`mongoose`)

const productsSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: String
})

const newProduct = new mongoose.model(`product`, productsSchema)

module.exports = newProduct