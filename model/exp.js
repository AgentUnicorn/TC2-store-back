const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    title: String,
    pictureUrl: String,
    country: String,
    price: Number,
    duration: Number,
    city: String,
    language: String,
    groupSize: Number,
    description: String
})

const Exp = mongoose.model('Exp', schema)

module.exports = Exp