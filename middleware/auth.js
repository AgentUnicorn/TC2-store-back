const jwt = require("jsonwebtoken")
const User = require('../model/user')


exports.loginRequired = async (req, res, next) => {
    try {
        if (!req.headers.authorization || !req.headers.authorization.startsWith("Bearer ")){
            return res.status(400).json({status: "Fail", error: "Unauthorized"})
        }
        const token = req.headers.authorization.replace("Bearer ","")
        const decoded = jwt.verify(token, process.env.SECRET)
        // decoded._id
        const user = await User.findById(decoded._id)
        if(!user)
        return res.status(400).json({status: "Fail", error: "Unauthorized"})
    
        req.user = user
        console.log(user)
        next()
    } catch(err) {
        return res.status(401).json({status: "Fail", error: err.message})
    }
}


exports.adminRequired = (req, res, next) => {
    if(req.user.type !== "admin"){
        return res.status(401).json({status: "Fail", message: "Only admin can use this function"})
    }
    next()
}