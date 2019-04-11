const controller = require('../controllers/controller.js')
const path = require('path')

module.exports = function(app) {
    app.get('/', (req,res) => {
      res.sendFile(path.resolve('./public/src/index.html'))
    })

    app.post("/api/login", (req,res) => {
      // console.log(req);
      return controller.login(req,res);
    }),

    app.post('/api/register', (req,res) => {
      return controller.register(req,res);
    })

    app.get('/api/loggedin', (req,res,next) => {
      return controller.getLogged(req,res);
    })

    // app.all("*", (req,res,next) => {
    //     res.sendFile(path.resolve('./public/src/index.html'))
    // })
}
