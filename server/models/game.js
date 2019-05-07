const mongoose = require('mongoose');

var Game = mongoose.model("game", new mongoose.Schema({
    name: {
        required: true,
        type: String,
        unique: true
    },
    version: {
        required: true,
        type: String
    }
}));

module.exports = Game;