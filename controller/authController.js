const User = require('../model/user')


exports.loginWithEmail = async (req, res) => {
    const { email, password } = req.body;
    if(!email || !password){
        return res.status(400).json({status: "Fail", error: "Email and Password are required"})
    }

    const user = await User.loginWithEmail(email, password);
    if (!user){
        return res.status(400).json({status: "Fail", error: "Wrong email or password"})
    } 

    const token = await user.generateToken();

    res.json({status: "Login Success", data: {user, token} })
}