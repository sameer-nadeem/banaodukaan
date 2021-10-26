const { collection } = require("../models/product.model")
const Product = require("../models/product.model")


const addProduct = async(req, res) => {

    console.log(req.body)

    try{
        var {
            title,
            price,
            stock,
            description,
            brandID,
            inventoryID,
            collectionID,
            deleteFlag
        } = req.body

        const product = new Product({
            title,
            price,
            stock,
            description,
            brandID,
            inventoryID,
            collectionID,
            deleteFlag
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
  
  const getProduct = async(req, res) => {

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

  const deleteProduct = async(req,res)=>{
    try {

        const id = req.params.id

        const exists = await Product.exists({
            _id: id
        })

        if (!exists) {
            return res.status(400).json({
                error: "Product Does Not Exist"
            })
        }

        await Product.deleteOne({
            _id: id
        })

        res.status(200).end()
    } catch (err) {
        console.log(err)

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
            deleteFlag
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
    updateProduct,
    deleteProduct

}
  