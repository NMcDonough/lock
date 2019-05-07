const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
require('../models/user.js')
var User = mongoose.model('user');

module.exports = {
    register:(req, res) => {
        user = new User(req.body);
        User.findOne({email: user.email}, (err,user) => {
            console.log("Mongo queried. Response:\n" + err + "\nData found:\n" + user);
            if(err)
                return res.json({message:"Search error",error: err});
            else if(user)
                return res.json({message: "Email is in use!"});
        });
        console.log("Email is valid")

        User.findOne({username: user.username}, (err, user) => {
            if(err){
                res.json({error: err, message: "Undefined error. Contact an administrator"})
            } else if(user) {
                res.json({error: "Username is taken", error: "Username is taken"});
            }
        });
        console.log("Username is valid");

        if(user.password == req.body.confirm){
            bcrypt.hash(user.password, 10, (err, hash) => {
                if(err) {
                    console.log("Error:", err);
                    return res.json({error: err, message: "Registration error"});
                } else {
                    user.password = hash;
                    
                    user.save((err) => {
                        if(err){
                            console.log(err);
                            return res.json({message: "Register error", error: err});
                        } else {
                            return res.json({message: "Registration successful. Please log in."})
                        }
                    });
                }
            })
         } else {
             console.log("Passwords don't match. Sending data back")
             res.json({message: "Passwords do not match!", error: "Passwords do not match!"});
         }
    },

    login: (req,res) => {
        console.log("login method hit");
        User.findOne({email: req.body.email}, (err, user) => {
            if(err) {
                console.log("ERROR: ")
                console.log(err)
                return res.json({message: "Login error", error: err});
            } else {
                if(user){
                    console.log("user found")
                    bcrypt.compare(req.body.password, user.password, (err, result) => {
                        if(result) {
                            if (!result.version || result.version !== new User.version){
                                const USER = new User;
                                user.version = USER.version;
                                user.save();
                            }
                            return res.json({user: user._id});
                        } else {
                            return res.json({message: "Password incorrect", error: "Password incorrect"})
                        }
                    })
                } else {
                    console.log("user not found. relaying to client")
                    return res.json({message: "User not found. Please register.", error:"User not found"});
                }
            }
        })
    },

    getUser: (req, res) => {
        User.findOne({_id: req.params.id}, (err, user) => {
            if(err)
                return res.json({error: err})
            else if (user){
                user.password = null;
                return res.json({user: user});
            }
        });
    },

    deleteUser: (req,res) => {
        console.log("Searching for:", req.params.id)
        User.findOne({_id: req.params.id}).remove().exec((err, user) => {
            console.log("Found", user);
            if(err) {
                return res.json({error: err, message: "There was an error!"})
            } else if(user) {
                User.remove(user);
                return res.json({message: "Account deleted. Godspeed."})
            }
        })
        return res.json({message: "i been had got pinged dude"})
    },

    updateScore: (req, res) => {
        console.log("Received this data",req.body);
        User.findOne({_id: req.body.user}, (err,user) => {
            if(err) {
                return res.json({error: err, message: "Error retrieving user"});
            } else if(user) {
                console.log("Found user:", user.username);
                user.highscores[req.body.game] = req.body.score;
                console.log("User data:", user);
                user.save((err, user) => {
                    if(err) {
                        return res.json({error: err, message: "Error saving user data"})
                    } else if (user) {
                        console.log("Saving successful. Mongoose returned:", user);
                        user.password = null;
                        return res.json({message: "Successful save", user: user});
                    } else {
                        console.log("None of the correct methods fired under /updateScore")
                        return res.json({message: "Critical error"})
                    }
                });
            }
        })
    }
}