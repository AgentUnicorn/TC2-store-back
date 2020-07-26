var express = require('express')
var router = express.Router();
const {
    loginWithEmail
} = require('../controller/authController');


// localhost:5000/auth/
router.route('/login')
    .post(loginWithEmail)


module.exports = router; 