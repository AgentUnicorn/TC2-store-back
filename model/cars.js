const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, "Name is required"]
    },
    brand: {
        type: String,
        trim: true,
        required: [true, "Brand is required"]
    },
    pictureUrl: {
        type: String,
        required: [true, "Picture is required"]
    },
    admin: {
        type: mongoose.Schema.ObjectId,
        ref: "User"
        // required: true
    },
    tags: [{
        type: mongoose.Schema.ObjectId,
        ref: "Tag",
        required: true
    }]
}, {
    timestamps: true,
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
})

// schema.pre('save', async function (next){
//     let arr = [...this.tags];

//     console.log(result)
//     let foo = arr.map(async e=> await Tag.findOne({ tag: e.toUpperCase().trim}))
//     let result = Promise.all(foo)
//     this.tags = result
//     next()
// })

const Car = mongoose.model('Car', schema)

module.exports = Car