const mongoose = require('mongoose')

var User = mongoose.model("user", new mongoose.Schema({
    username: {
        type: String,
        required=[true, "Username required"],
        minlength: [3, 'Name must be 3 or more characters']},
    email: {
        type: String, 
        required: [true, "Email is required"],
        validate: {
            validator:function(value){
                return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(value);
            },
            message: "Must be a valid email."
        }
    },
    password: {
        type: String,
        required: [true, "Password required"]
    }
}, {timestamps=true}))

module.exports = User;