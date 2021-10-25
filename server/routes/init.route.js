const exampleRouter = require('./example.route')

const init = (app) => {
  app.use('/example', exampleRouter)
}


module.exports = init
