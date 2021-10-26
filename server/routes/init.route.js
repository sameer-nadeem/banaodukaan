const exampleRouter = require('./example.route')
const productRouter = require('./product.route')


const init = (app) => {
  app.use('/example', exampleRouter)
  app.use('/product', productRouter)
}


module.exports = init
