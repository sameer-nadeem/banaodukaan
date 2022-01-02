const express = require('express')
const Merchant = require('../../models/merchant.model')
const User = require('../../models/user.model')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')


const registerMerchant = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
        } = req.body

        const exists = await User.exists({
            email
        })

        if (exists) {
            return res.status(400).json({
                error: 'USER_ALREADY_EXIST'
            })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const user = new User({
            email,
            password: hashedPassword,
            firstName: firstName,
            lastName: lastName
        })

        await user.save()

        const merchant = new Merchant({
            userId: user._id,
            myStores: []
        })

        await merchant.save()

        const payload = {
            type: 'Merchant',
            id: user._id
        }


        const token = await jwt.sign(payload, config.get('token-secret'), { expiresIn: 360000 })

        return res.status(200).json({
            token
        })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({
            error: 'SERVER_ERROR'
        })
    }

}

const loginMerchant =  async (req, res) => {
    try {
        const {
            email,
            password
        } = req.body

        const exists = await User.exists({
            email
        })

        if (!exists) {
            return res.status(400).json({
                error: 'INVALID_CREDITS'
            })
        }

        const user = await User.findOne({
            email
        })

        const isPresent = await Merchant.exists({
            userId: user._id
        })

        if (!isPresent) {
            return res.status(400).json({
                error: 'USER_IS_NOT_MERCHANT'
            })
        }
        
        const passMatch = await bcrypt.compare(password, user.password)
        const type = 'Merchant'
        if (passMatch) {
            const token = await jwt.sign({
                type, id: user._id
            }, config.get('token-secret'), {
                expiresIn: 360000
            })

            return res.status(200).json({
                token
            })
        }
        else {
            return res.status(400).json({
                error: 'INVALID_CREDITS'
            })
        }
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({
            error: 'SERVER_ERROR'
        })
    }

}

module.exports = {
    registerMerchant,
    loginMerchant
}