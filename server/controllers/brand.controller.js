const Brand = require("../models/brand.model")

const addBrand = async (req, res) => {


    try {
        var {
            name,
            description
        } = req.body

        const brand = new Brand({
            name,
            description
        })

        await brand.save()

        return res.status(200).json({
            brand
        })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({
            error: "Server Error"
        })
    }
}

const getBrand = async (req, res) => {
    try {


        const id = req.params.id

        const brand = await Brand.findById(id)

        return res.status(200).json({
            brand
        })
    }
    catch (err) {
        console.log(err)

        return res.status(500).json({
            error: errors.SERVER_ERROR
        })
    }
}


const getBrands = async (req, res) => {
    try {



        const brands = await Brand.find({ deleteFlag: false })

        return res.status(200).json({
            brands
        })
    }
    catch (err) {
        console.log(err)

        return res.status(500).json({
            error: errors.SERVER_ERROR
        })
    }
}

const deleteBrand = async (req, res) => {

    try {

        const id = req.params.id
        const brand = await Brand.findOne({
            _id: id
        })

        brand.deleteFlag = true

        await brand.save()
        return res.status(200).json({
            brand
        })
    } catch (err) {
        return res.status(500).json({
            error: "Server Error"
        })
    }

}

const updateBrand = async (req, res) => {
    try {
        var {
            name,
            deleteFlag,
            description
        } = req.body

        const id = req.params.id
        const brand = await Brand.findOne({
            _id: id
        })

        brand.name = name
        brand.deleteFlag = deleteFlag
        brand.description = description

        await brand.save()

        return res.status(200).json({
            brand
        })
    } catch (err) {
        return res.status(500).json({
            error: "Server Error"
        })
    }

}

module.exports = {
    addBrand,
    deleteBrand,
    getBrand,
    getBrands,
    updateBrand
}
