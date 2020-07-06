const Exp = require('../model/exp')
const { query } = require('express')

// Create an Experience
const createExp = async (req, res) => {
    const {
        title, 
        pictureUrl, 
        country, 
        price, 
        duration,
        city,
        language,
        groupSize,
        description 
    } = req.body
    console.log(req.body)
    const newExp = await Exp.create({
        title,
        pictureUrl,
        country,
        price,
        duration,
        city,
        language,
        groupSize,
        description
    })
    res.send(newExp)
}


// Show all experiences on main page
const showExp = async (req, res) => {
    const exp = await Exp.find()
    res.send(exp)
    const expPage = await Exp.find({}).skip().limit()
    const page = req.query.page *1 || 1
    const limit = req.query.limit *1 || 1
    const skip = (page -1) * limit;
    query = query.skip(skip).limit(limit);
}


// Get a single experience data
const getExpByID = async (req, res) => {
    console.log(req.params)
    const getExp = await Exp.findById({
        _id: req.params.id
    })
    res.send(getExp)
}

const updateExpByID = async (req, res) => {
    const updateExp = await Exp.findOne({
        _id: req.params.id
    })
    for(const key in req.body){
        updateExp[key] = req.body[key]
    }
    await updateExp.save()
    res.json({status: 'ok', data: updateExp})
}

module.exports = { createExp, showExp, getExpByID, updateExpByID }

