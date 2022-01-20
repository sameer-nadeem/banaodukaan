const User = require("../models/user.model")
const Customer = require("../models/customer.model")


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

        const user = new User({
            firstName,
            lastName,
            email
        })

        await user.save()

        const customer = new Customer({
            userId : user._id,
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

        const id = req.params.id

        const user = await User.findOne({
            _id: id,
        })

        user.firstName = firstName
        user.lastName = lastName
        user.email = email
        user.save()

        const customer = await Customer
            .findOne({
                userId: id,
            })

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
                
            }).populate("userId")
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
    
        }).populate("userId")
        return res.status(200).json({
            customers
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





module.exports = {
    addCustomer,
    getCustomer,
    deleteCustomer,
    updateCustomer,
    getCustomers

}