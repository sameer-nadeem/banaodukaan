const mongoose = require('mongoose')
const faker = require('faker')
const Product = require('../models/product.model')
const Brand = require('../models/brand.model')
const Collection = require('../models/collection.model')
const connectDb = require('../db/connectDb')

const seedProducts = async () => {
  await connectDb()
  await Product.deleteMany()
  const brands = await Brand.find()
  const collections = await Collection.find()

  for (let i = 0; i < 50; i++) {
    const title = faker.commerce.product()
    const price = faker.commerce.price(1000, 10000)
    const stock = parseInt(1 + (Math.random() * 50))
    const description = faker.commerce.productDescription()
    const brandId = brands[parseInt(Math.random() * brands.length)]._id
    const inventoryId = null
    const collectionId = collections[parseInt(Math.random() * collections.length)]._id
    const status = 'Active'
    const image = '/uploads/IMAGE-1636822803539.jpg'

    const product = new Product({
      title,
      price,
      stock,
      description,
      brandId,
      inventoryId,
      collectionId,
      status,
      image
    })
    await product.save()
  }

}


seedProducts().then(() => console.log('Complete...'))
