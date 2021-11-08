const exampleRouter = require('./example.route')
const productRouter = require('./product.route')
const collectionRouter = require('./collection.route')
const brandRouter = require('./brand.route')


const init = (app) => {
  app.use('/api/example', exampleRouter)
  app.use('/api/product', productRouter)
  app.use('/api/collection', collectionRouter)
  app.use('/api/brand', brandRouter)
}


module.exports = init
