var express = require('express');
var router = express.Router();
const {
    createCar, 
    getCars,
    updateCarByID,
    getCarByID
} = require('../controller/carController')
const {
    loginRequired,
    adminRequired
} = require('../middleware/auth')

/* GET car page. */
// http://localhost:5000/car
router.route('/')
    .post(
        loginRequired,
        adminRequired,
        createCar
    )
    .get(getCars)

// http://localhost:5000/car/:id
router.route('/:id')
    .get(getCarByID)
    .patch(
        loginRequired,
        adminRequired,
        updateCarByID
        )

module.exports = router;
