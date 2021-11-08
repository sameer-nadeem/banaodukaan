const { collection } = require("../models/product.model")
const Product = require("../models/product.model")
const multer = require('multer')
const path = require("path")

const Storage = multer.diskStorage({
    destination: "./public/uploads",
    filename: function(req, file, cb){
        cb(null,"IMAGE-" + Date.now() + path.extname(file.originalname));
 }
})

const upload = multer({
    storage: Storage,
    limits:{fileSize: 1000000},
}).single('myImage')


const addProduct = async(req, res) => {

   

    try{
        var {
            title,
            price,
            stock,
            description,
            brandId,
            inventoryId,
            collectionId,
            deleteFlag,
            status,
            image
        } = req.body

        const product = new Product({
            title,
            price,
            stock,
            description,
            brandId,
            inventoryId,
            collectionId,
            deleteFlag,
            status,
            image
        })

        await product.save()

        return res.status(200).json({
            product
        })
    } 
    catch (err) {
        console.log(err)
        return res.status(500).json({
            error: "Server Error"
        })
    }

    

  }
  
  // get all products
  
  const getProducts = async(req, res) => {

    try{
        const products = await Product.find()
        return res.status(200).json({
            products
        })
    }catch (err) {
        return res.status(500).json({
            error: "Server Error"
        })
    }

  }


//upload an image using multer in add product
  const uploadImage = (req, res) =>{
      upload(req, res, (err) => {
          console.log(res)
          res.send(req.file)
      })
  }

  const getProduct = async(req, res) => {
    try {


        const id = req.params.id

        const product = await Product.findById(id).populate(['collectionId', 'brandId'])

        return res.status(200).json({
            product
        })
    }
    catch (err) {
        console.log(err)

        return res.status(500).json({
            error: errors.SERVER_ERROR
        })
    }
  }

  const deleteProduct = async(req,res)=>{
    try{
        
        const id = req.params.id
        const product = await Product.findOne({
            _id: id
        })

        product.deleteFlag = true

        await product.save()
        return res.status(200).json({
            product
        })
      }catch (err) {
        return res.status(500).json({
            error: "Server Error"
        })
    }

  }
// update product
  const updateProduct = async(req,res) =>{
      try{
        var {
            title,
            price,
            stock,
            description,
            brandID,
            inventoryID,
            collectionID,
            deleteFlag,
            status,
            image
        } = req.body

        const id = req.params.id
        const product = await Product.findOne({
            _id: id
        })

        product.title = title
        product.price = price
        product.stock = stock
        product.description = description
        product.brandID = brandID
        product.inventoryID = inventoryID
        product.collectionID = collectionID
        product.deleteFlag = deleteFlag
        product.status = status
        product.image = image
        await product.save()
        return res.status(200).json({
            product
        })
      }catch (err) {
        return res.status(500).json({
            error: "Server Error"
        })
    }

  }



  module.exports = {
    addProduct,
    getProduct,
    uploadImage,
    updateProduct,
    deleteProduct,
    getProducts

}
  