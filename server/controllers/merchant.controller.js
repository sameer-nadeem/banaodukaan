const Product = require("../models/product.model");

const Order = require("../models/order.model");

const getOrders = async (req, res) => {
    console.log(
        'hello'
    )
    try {

        const orders = await Order.find({
            deleteFlag: false,
            storeId: req.storeId
        })
        console.log('hit hit', req.storeId)
        return res.status(200).json({
            orders,
        })
    }
    catch (err) {
        console.log(err)

        return res.status(500).json({
            error: "SERVER_ERROR"
        })
}

}

const getOrder = async (req, res) => {
    try {

        const id = req.params.id

        const order = await Order
            .findOne({
                _id: id,

            })
        return res.status(200).json({
            order
        })
    }
    catch (err) {
        console.log(err)

        return res.status(500).json({
            error: "SERVER_ERROR"
        })
    }

}


const deleteOrder = async (req, res) => {
    try {

        const id = req.params.id
        const order = await Order.findOne({
            _id: id,
        })

        order.deleteFlag = true

        await order.save()
        return res.status(200).json({
            order
        })
    } catch (err) {
        return res.status(500).json({
            error: "Server Error"
        })
    }

}


const updateOrder = async (req, res) => {
    try {
        var {
            fullName,
            email,
            phone,
            address,
            city,
            postalCode
        } = req.body

        const id = req.params.id

        const order = await Order
            .findOne({
                _id: id,
            })

        console.log(order)
        order.fullName = fullName
        order.email = email
        order.phone = phone
        order.address = address
        order.city = city
        order.postalCode = postalCode
        await order.save()
        return res.status(200).json({
            order
        })
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            error: "Server Error"
        })
    }

}



module.exports = {
    getOrders,
    getOrder,
    deleteOrder,
    updateOrder
  };