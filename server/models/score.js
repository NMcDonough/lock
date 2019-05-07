var Game = require('./game');
const mongoose = require("mongoose");

var Score = mongoose.model('score', new mongoose.Schema({
    value: {
        required: true,
        type: Number,
        default: 0
    },
    game: {
        required: true,
        type: String
    }
}, {timestamps: true}));

module.exports = Score;