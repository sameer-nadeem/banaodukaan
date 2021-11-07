const mongoose = require('mongoose')


const connectDb = async () => {
  try {
    const conn = await mongoose.connect('mongodb://localhost:27017/banaodukaan')
    console.log('Connected to Database!')
  } catch (error) {
    console.log(`Unable to connect DB --`, error)
  }
}

module.exports = connectDb
