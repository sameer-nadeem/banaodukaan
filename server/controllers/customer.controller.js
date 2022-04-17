const User = require("../models/user.model")
const Customer = require("../models/customer.model")
const bcrypt = require('bcryptjs')
const Order = require("../models/order.model");


const addCustomer = async (req, res) => {

    try {
        var {
            firstName,
            lastName,
            email,
            phone,
            country,
            address,
            apartment,
            city,
            postalCode
        } = req.body

        console.log(req.body)

        // const user = new User({
        //     firstName,
        //     lastName,
        //     email
        // })

        // await user.save()

        const customer = new Customer({
            // userId: user._id,
            storeId: req.storeId,
            firstName,
            lastName,
            email,
            phone,
            country,
            address,
            apartment,
            city,
            postalCode
        })

        customer.save()

        return res.status(200).json({
            customer
        })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({
            error: "Server Error"
        })
    }


}


const updateCustomer = async (req, res) => {
    try {
        var {
            fullName,
            lastName,
            email,
            phone,
            country,
            address,
            apartment,
            city,
            postalCode
        } = req.body

        const id = req.user.id

        const customer = await Customer
            .findOne({
                _id: id,
            })

        console.log(customer)
        customer.firstName = fullName
        customer.lastName = lastName
        // customer.email = email
        customer.phone = phone
        customer.address = address
        customer.country = country
        customer.apartment = apartment
        customer.city = city
        customer.postalCode = postalCode
        await customer.save()
        return res.status(200).json({
            customer
        })
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            error: "Server Error"
        })
    }

}

const updateCustomerPassword = async (req, res) => {
    const id = req.user.id
    console.log("hebfiwifwihfwho    ")
    try {

        var {
            password,
            newPassword
        } = req.body

        const customer = await Customer.findOne({ _id: id })
        const passMatch = await bcrypt.compare(password, customer.password)
        if (passMatch) {
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(newPassword, salt)
            customer.password = hashedPassword

            customer.save()
        }
        else {
            return res.status(400).json({
                error: "Invalid Password"
            })
        }

        return res.status(200).json({
            customer
        })
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            error: "Server Error"
        })
    }


}



const getCustomer = async (req, res) => {

    try {

        const id = req.params.id

        const customer = await Customer
            .findOne({
                _id: id,

            })
        return res.status(200).json({
            customer
        })
    }
    catch (err) {
        console.log(err)

        return res.status(500).json({
            error: errors.SERVER_ERROR
        })
    }

}

const getCustomers = async (req, res) => {

    try {

        const customers = await Customer.find({
            deleteFlag: false,
            storeId: req.storeId
        })
        console.log('hit hit', req.storeId)
        return res.status(200).json({
            customers,
        })
    }
    catch (err) {
        console.log(err)

        return res.status(500).json({
            error: errors.SERVER_ERROR
        })
    }

}


const deleteCustomer = async (req, res) => {
    try {

        const id = req.params.id
        const customer = await Customer.findOne({
            _id: id,
        })

        customer.deleteFlag = true

        await customer.save()
        return res.status(200).json({
            customer
        })
    } catch (err) {
        return res.status(500).json({
            error: "Server Error"
        })
    }

}




const getCustomerOrders = async (req, res) => {
    try {
        const id = req.params.id 

        const orders = await Order.find({
            deleteFlag: false,
            userId: id
        }).populate({
            path: 'products',
            model: "Product",
            populate :{
                path: 'product',
                model: "Product"
            }
        })

        
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


const getCustomerOrder = async (req, res) => {
    try {

        const id = req.params.id

        const order = await Order
            .findOne({
                _id: id,

            }).populate({
                path: 'products',
                model: "Product",
                populate :{
                    path: 'product',
                    model: "Product"
                }
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



module.exports = {
    addCustomer,
    getCustomer,
    deleteCustomer,
    updateCustomer,
    updateCustomerPassword,
    getCustomers,
    getCustomerOrders,
    getCustomerOrder

}
