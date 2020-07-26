var express = require('express');
var router = express.Router();
const {
    createCar, 
    getCars,
    updateCarByID,
    getCarByID,
    DeleteCar
} = require('../controller/carController')
const {
    loginRequired,
    adminRequired
} = require('../middleware/auth')

/* GET car page. */
// http://localhost:5000/car
router.route('/')
    .post(
        // loginRequired,
        // adminRequired,
        createCar
    )
    .get(getCars)

// http://localhost:5000/car/:id
router.route('/:id')
    .get(getCarByID)
    .delete(DeleteCar)

router.route('/edit/:id')
    .put(
        // loginRequired,
        // adminRequired,
        updateCarByID
    )

module.exports = router;
