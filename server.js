const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const session = require('express-session')
const mongoose = require('mongoose')
const path = require('path')
const flash = require('express-flash')

var originsWhitelist = [
  'http://localhost:4200'
];
var corsOptions = {
  origin: function(origin, callback){
        var isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
        callback(null, isWhitelisted);
  },
  credentials:true
}
//here is the magic
app.use(cors(corsOptions));

mongoose.Promise = global.Promise

app.use(flash())//  Use flash
app.use(bodyParser())// Use body parser
app.use(bodyParser.json())
app.use('/static', express.static(path.join(__dirname, './client/static/')))// Identify static folder
app.use(session({
  secret: 'SECRET_KEY',
  name: 'test',
  cookie: {
    resave: true,
    duration: 30 * 60 * 1000,
    activeDuration: 5 * 60 * 1000,
    saveUninitialized: true
  }
}))
app.set('views', path.join(__dirname, './client/views'))// Identify views folders
app.set('view engine', 'ejs')// Set EJS as the view engine

require('./server/config/routes.js')(app)
require('./server/config/mongoose.js')

app.listen(8000, function(){//  Setting your port
    console.log('Listening on port 8000')
})
