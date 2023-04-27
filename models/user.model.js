const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name:{type: String, required:true},
    email:{type: String, required:true},
    phone:{type: String, required:true},
    password:{type: String, required:true},
    bio:{type: String, required:true},
    profile:{type: String, required:true},
})

const userModel = mongoose.model('users',userSchema);

module.exports = {
    userModel
}