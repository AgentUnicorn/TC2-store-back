const User = require('../model/user')


exports.createUser = async (req, res) => {
    try {
        const { email, username, password, type } = req.body;
    // console.log(req.body)
    if (!email || !username || !password){
        return res.status(400).json({
            status: "fail",
            error: "Email, name and password are required"
        });
    }

    const user = await User.create({
        email,
        username,
        password,
        type: type || "player"
    })

    res.status(201).json({status: "OK", data: user})
    } catch(err) {
        console.log(err)
        res.status(500).json({status: "Error", error: err.message})
    }
}


exports.getUserProfile = async (req, res) => {
    res.json({status: "OK", data: req.user})
}