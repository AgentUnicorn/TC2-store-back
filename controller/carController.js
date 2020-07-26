const Car = require('../model/cars')
const Tag = require('../model/tag')
const { query } = require('express')

// Create car list 
const createCar = async (req, res) => {
    try {
        const {
            name,
            brand,
            pictureUrl,
            admin,
            tags
        } = req.body
        if(!name || !brand || !tags || !pictureUrl){
            return res.status(400).json({
                status: "Fail",
                error: "Those are required"
            })
        };
    
        const tagArr = await Tag.convertToObject(tags)
        // console.log(tagArr)
        
        const newCar = await Car.create({
            name,
            brand,
            pictureUrl,
            admin,
            tags: tagArr
        })
    
        res.status(200).json({
            status: "Car created",
            data: newCar
        })
    } catch (err){
        console.log(err)
        res.status(400).json({status: "Fail", error: err.message})
    }
}


const PAGE_SIZE = 15
// Show all cars on main page
const getCars = async (req, res) => {
    const pageNum = req.query.page;
    const numSkip = (parseInt(pageNum) -1) *PAGE_SIZE
    const carPage = await Car.find().skip(numSkip).limit(PAGE_SIZE)
    res.send(carPage)
}


// Get a single car data
const getCarByID = async (req, res) => {
    console.log("haha", req.params.id)
    const getCar = await Car.findById({
        _id: req.params.id
    })
    console.log("here")
    res.send(getCar)
}

const updateCarByID = async (req, res) => {
    try {
        const updateCar = await Car.findOne({
            _id: req.params.id
        })
        for(const key in req.body){
            updateCar[key] = req.body[key]
        }
        await updateCar.save()
        res.json({status: 'ok', data: updateCar})
    } catch (err) {
        console.log(err)
        res.status(400).json({status: "Fail", error: err.message})
    }
}

const DeleteCar = async (req, res) => {
    try {
        const deleteCar = await Car.findOneAndDelete({
            _id: req.params.id
        })
        res.status(200).json({status: "OK"})
    } catch (err) {
        console.log(err)
        res.status(400).json({status: "Fail", error: err.message})
    }
}

module.exports = { createCar, getCars, getCarByID, updateCarByID, DeleteCar }

