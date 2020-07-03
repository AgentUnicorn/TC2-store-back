var express = require('express');
var router = express.Router();
const {
    createExp, 
    showExp
} = require('../controller/expController')

/* GET exp page. */
router.route('/')
    .post(createExp)
    .get(showExp)

module.exports = router;
