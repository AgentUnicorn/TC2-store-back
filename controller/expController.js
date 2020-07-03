const Exp = require('../model/exp')


const createExp = async (req, res) => {
    const {title, pictureUrl, country, price, duration } = req.body
    console.log(req.body)
    const newExp = await Exp.create({
        title,
        pictureUrl,
        country,
        price,
        duration
    })
    res.send(newExp)
}

const showExp = async (req, res) => {
    const exp = await Exp.find()
    res.send(exp)
}

module.exports = { createExp, showExp }

