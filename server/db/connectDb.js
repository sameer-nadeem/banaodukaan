const mongoose = require('mongoose')


const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_URI)
    console.log('Connected to Database!')
  } catch (error) {
    console.log(`Unable to connect DB --`, error)
  }
}

module.exports = connectDb
