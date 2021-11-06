const { collection } = require("../models/collection.model")
const Collection = require("../models/collection.model")
const Product = require("../models/product.model")



const addCollection = async(req, res) => {

    
    try{
        var {
           name
        } = req.body

        const collection = new Collection({
            name
        })

        await collection.save()

        return res.status(200).json({
            collection
        })
    } 
    catch (err) {
        console.log(err)
        return res.status(500).json({
            error: "Server Error"
        })
    }
}

const getCollection = async(req,res) =>
{
    try {


        const id = req.params.id

        const collection = await Collection.findById(id)

        return res.status(200).json({
            collection
        })
    }
    catch (err) {
        console.log(err)

        return res.status(500).json({
            error: errors.SERVER_ERROR
        })
    }
}


const getCollections = async(req,res) =>
{
    try {


        
        const collections = await Collection.find()

        return res.status(200).json({
            collections
        })
    }
    catch (err) {
        console.log(err)

        return res.status(500).json({
            error: errors.SERVER_ERROR
        })
    }
}

const deleteCollection = async (req,res) =>{
    
    try{
        
        const id = req.params.id
        const collection = await Collection.findOne({
            _id: id
        })

        collection.deleteFlag = true

        await collection.save()
        return res.status(200).json({
            collection
        })
      }catch (err) {
        return res.status(500).json({
            error: "Server Error"
        })
    }

}

const updateCollection = async (req,res) =>
{
    try{
        var {
            name,
            deleteFlag
        } = req.body

        const id = req.params.id
        const collection = await Collection.findOne({
            _id: id
        })

        collection.name = name
        collection.deleteFlag = deleteFlag

        await collection.save()

        return res.status(200).json({
            collection
        })
      }catch (err) {
        return res.status(500).json({
            error: "Server Error"
        })
    }

}

module.exports = {
    addCollection,
    deleteCollection,
    getCollection,
    getCollections,
    updateCollection
}
  