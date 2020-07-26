const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt")
const round = 10;
const jwt = require('jsonwebtoken')

const schema = new mongoose.Schema({
    email: {
        type: String, 
        required: [true, "Email is required"],
        unique: true,
        trim: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Email is invalid")
            }
        }
    }, 
    username: {
        type: String,
        required: [true, "Username is required"],
        trim: true,
        maxlength: 16,
        minlength: 5
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    tokens: [String],
    type: {
        type: String,
        enum: ["player", "admin"],
        default: "player"
    }
}, {
    timestamps: true,
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
})

schema.methods.toJSON = function(){
    // inside "Methods", "This" here is refer to instance
    const obj = this.toObject();
    delete obj.password;
    delete obj.id;
    delete obj.tokens;
    return obj
}

// Generate Token
schema.methods.generateToken = async function(){
    const token = jwt.sign({
        _id: this._id
    }, process.env.SECRET, {expiresIn: 60 * 60})

    this.tokens.push(token)
    await this.save()
    return token
}

// A function to login with email
schema.statics.loginWithEmail = async function(email, password){
    // inside statics, "This" will prefer to the class
    const user = await this.findOne({email:email})
    if (!user){
        return null
    }
    const match = bcrypt.compare(password, user.password)

    if (match) return user
    return null
}

schema.pre("save", async function(next){
    console.log(this) 
    if (this.isModified("password")){
        this.password = await bcrypt.hash(this.password, round)
    }
    next();
})


module.exports = mongoose.model("User", schema)