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

    app.get('/api/user/:id', (req,res) => {
      return controller.getUser(req,res);
    })

    app.delete('/api/delete/user/:id', (req,res) => {
      return controller.deleteUser(req,res);
    })

    app.post('/api/updateScore', (req,res) => {
      console.log("Route hit")
      return controller.updateScore(req, res);
    })

    app.get('/api/users', (req, res) => {
      return controller.getAll(req, res);
    })

    // app.all("*", (req,res,next) => {
    //     res.sendFile(path.resolve('./public/src/index.html'))
    // })
}
