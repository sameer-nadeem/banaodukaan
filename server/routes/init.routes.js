const exampleRouter = require('./example.routes')
const productRouter = require('./product.routes')
const collectionRouter = require('./collection.routes')
const brandRouter = require('./brand.routes')
const uploadRouter = require('./upload.routes')

const init = (app) => {
  app.use('/api/example', exampleRouter)
  app.use('/api/product', productRouter)
  app.use('/api/collection', collectionRouter)
  app.use('/api/brand', brandRouter)
  app.use('/api/upload', uploadRouter)
}


module.exports = init
