const mongoose = require('mongoose')
const path = require('path')
const fs = require('fs')
var models_path = path.join(__dirname, './../models')
mongoose.connect('mongodb://localhost/lock')//  Change 'MODEL' towhatever you want. You will use this in controller.js and to rename MODEL_NAME.js

fs.readdirSync(models_path).forEach(function(file) {
	if(file.indexOf('.js') >=0) {
		require(models_path + '/' + file)
	}
})
