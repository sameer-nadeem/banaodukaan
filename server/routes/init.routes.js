const exampleRouter = require('./example.routes')
const productRouter = require('./product.routes')
const collectionRouter = require('./collection.routes')
const brandRouter = require('./brand.routes')
const uploadRouter = require('./upload.routes')
const customerRouter = require('./customer.routes')
const authRouter = require('./auth.routes')
const cartRouter = require('./cart.routes')
const merchantRouter = require('./merchant.routes')
const analyticsRouter = require('./analytics.routes')

const init = (app) => {
  app.use('/api/example', exampleRouter)
  app.use('/api/product', productRouter)
  app.use('/api/collection', collectionRouter)
  app.use('/api/brand', brandRouter)
  app.use('/api/upload', uploadRouter)
  app.use('/api/customer', customerRouter)
  app.use('/api/cart', cartRouter)
  app.use('/api/merchant', merchantRouter)
  app.use('/api/auth', authRouter)
  app.use('/api/analytics', analyticsRouter)
  

}


module.exports = init
