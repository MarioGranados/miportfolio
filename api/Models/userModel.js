const mongoose = require('mongoose')
const {Schema} = mongoose;

const userSchema = new Schema({
    username: {type: String, required: true, unique: true, min: 4},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
})

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;