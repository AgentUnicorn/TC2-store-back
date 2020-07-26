var express = require('express')
var router = express.Router();
const {
    createUser,
    getUserProfile
} = require('../controller/userController');
const {loginRequired} = require('../middleware/auth')
const { route } = require('./auth');


// localhost:5000/user/
router.route('/')
    // Get user list
    .get(function (req, res, next) {
        res.send('respond with a resource');
    })
    // Create a user
    .post(createUser)

router.route('/profile')
    .get(loginRequired, getUserProfile)
module.exports = router;
