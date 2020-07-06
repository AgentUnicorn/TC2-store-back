var express = require('express');
var router = express.Router();
const {
    createExp, 
    showExp,
    getExpByID,
    updateExpByID
} = require('../controller/expController')

/* GET exp page. */
// http://localhost:5000/exp
router.route('/')
    .post(createExp)
    .get(showExp)

// http://localhost:5000/exp/:id
router.route('/:id')
    .get(getExpByID)
    .patch(updateExpByID)

module.exports = router;
