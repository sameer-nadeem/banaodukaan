const exampleRouter = require('./example.route')
const productRouter = require('./product.route')
const collectionRouter = require('./collection.route')
const brandRouter = require('./brand.route')


const init = (app) => {
  app.use('/example', exampleRouter)
  app.use('/product', productRouter)
  app.use('/collection',collectionRouter)
  app.use('/brand',brandRouter)
}


module.exports = init
