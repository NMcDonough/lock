const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
require('../models/user.js')
var User = mongoose.model('user')

module.exports = {
    register:(req, res) => {
        console.log("DEBUG: /register hit. Data received:\n" + req.body)
        user = new User(req.body);
        User.find({email: user.email}, (err,user) => {
            // console.log("Mongo queried. Response:\n" + err + "\nData found:\n" + user);

            if(err)
                return res.json({error: err});
            else
                return res.json({message: "Email is in use!"});
        });

        User.find({username: user.username}, (err, user => {
            return (err) ? res.json({error: err}) : res.json({message: "This username is taken!"});
        }))

        return user.password == user.confirm ? (
            bcrypt.hash(user.password, 10, (err, hash => {
                user.password = hash;
                // user.save(err => {
                //     err ? return res.json({error: err}) : (req.session = user._id; return user;)
                // })
            }))
        ) : res.json({test: "test"});
    }
}