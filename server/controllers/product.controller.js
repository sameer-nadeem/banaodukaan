const Product = require("../models/product.model")

const addProduct = async (req, res) => {



    try {
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
            image,
            storeId: req.storeId
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

const getProducts = async (req, res) => {

    try {
        const products = await Product.find({
            deleteFlag: false,
            storeId: req.storeId
        }).populate(['collectionId', 'brandId'])
        console.log(products)
        return res.status(200).json({
            products
        })
    } catch (err) {
        return res.status(500).json({
            error: "Server Error"
        })
    }

}



const getProduct = async (req, res) => {
    try {


        const id = req.params.id

        const product = await Product
            .findOne({
                _id: id,
                storeId: req.storeId
            })
            .populate(['collectionId', 'brandId'])

        return res.status(200).json({
            product
        })
    }
    catch (err) {
        console.log(err)

        return res.status(500).json({
            error: "SERVER_ERROR"
        })
    }
}

const deleteProduct = async (req, res) => {
    try {

        const id = req.params.id
        const product = await Product.findOne({
            _id: id,
            storeId: req.storeId
        })

        product.deleteFlag = true

        await product.save()
        return res.status(200).json({
            product
        })
    } catch (err) {
        return res.status(500).json({
            error: "Server Error"
        })
    }

}
// update product
const updateProduct = async (req, res) => {
    try {
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

        const id = req.params.id
        const product = await Product.findOne({
            _id: id,
            storeId: req.storeId
        })

        product.title = title
        product.price = price
        product.stock = stock
        product.description = description
        product.brandId = brandId
        product.inventoryId = inventoryId
        product.collectionId = collectionId
        product.deleteFlag = deleteFlag
        product.status = status
        product.image = image
        await product.save()
        return res.status(200).json({
            product
        })
    } catch (err) {
        return res.status(500).json({
            error: "Server Error"
        })
    }

}



module.exports = {
    addProduct,
    getProduct,
    updateProduct,
    deleteProduct,
    getProducts

}
