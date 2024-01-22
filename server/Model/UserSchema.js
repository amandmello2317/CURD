const mongoose = require('mongoose')

const {Schema} = mongoose

const UserSchema = new Schema({
    name:{
        type:String
    },
    email: {
        type:String
    },
    age: {
        type:String

    },
    phone:{
        type:String
    },
    img:[]
    
})
module.exports = mongoose.model("User", UserSchema)