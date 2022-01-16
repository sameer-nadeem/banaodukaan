const express = require('express')
const Merchant = require('../../models/merchant.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client(config.get('google-auth-client-id'));


const registerMerchant = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
        } = req.body

        const exists = await Merchant.exists({
            email
        })

        if (exists) {
            return res.status(400).json({
                error: 'USER_ALREADY_EXIST'
            })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const merchant = new Merchant({
            email,
            password: hashedPassword,
            firstName: firstName,
            lastName: lastName,
            myStores: []

        })

        await merchant.save()

        const payload = {
            type: 'Merchant',
            id: merchant._id
        }
        console.log('hererer')

        const token = jwt.sign(payload, config.get('token-secret'), { expiresIn: 360000 })
        return res.status(200).json({
            token: token,
            id: merchant._id
        })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({
            error: 'SERVER_ERROR'
        })
    }

}

const loginMerchant = async (req, res) => {
    try {
        const {
            email,
            password
        } = req.body

        const exists = await Merchant.exists({
            email
        })

        if (!exists) {
            return res.status(400).json({
                error: 'INVALID_CREDITS'
            })
        }

        const merchant = await Merchant.findOne({
            email
        })
        const passMatch = await bcrypt.compare(password, merchant.password)
        const type = 'Merchant'
        if (passMatch) {
            const token = jwt.sign({
                type, id: merchant._id
            }, config.get('token-secret'), {
                expiresIn: 360000
            })
            return res.status(200).json({
                token: token,
                id: merchant._id
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

const googleLogin = async (req, res) => {
    const { tokenId } = req.body // token id received from frontend

    try {
        const response = await client.verifyIdToken({ idToken: tokenId, audience: config.get('google-auth-client-id') })
        const { email_verified, name, email, given_name, family_name } = response.payload

        if (email_verified) {
            // email is verified -> good to go
            const exists = await Merchant.findOne({ // find if the user exists or not
                email
            })

            // if it doesnt exist -> then we need to create one otherwise if it exists then we need to check if its present in
            // merchant table or not
            // if its not present in the merchant table then we need to send an error message

            if (exists) { //login
                //if it exists -> check if merchant
                const merchant = await Merchant.findOne({
                    email
                })


                //exists and is a merchant-> then we need to
                const payload = {
                    type: 'Merchant',
                    id: merchant._id,
                }

                const token = jwt.sign(payload, config.get('token-secret'), { expiresIn: 360000 })
                return res.status(200).json({
                    token: token,
                    id: merchant._id
                })
            }
            else {
                //if user doesnt exist then we need to create it
                // let password = email + config.get('secret-token') //password in this case

                const merchant = new Merchant({
                    email,
                    password: "",
                    firstName: given_name,
                    lastName: family_name,
                    myStores: []
                })


                await merchant.save() // save user


                const payload = {
                    type: 'Merchant',
                    id: merchant._id,
                }

                const token = jwt.sign(payload, config.get('token-secret'), { expiresIn: 360000 })
                return res.status(200).json({
                    token: token,
                    id: merchant._id
                })
            }
        }
        else {
            //email not verified ->
            return res.status(400).json({
                error: "COULD_NOT_VERIFY_EMAIL"
            })
        }
    }
    catch {
        console.log("in catch")
        return res.status(400).json({
            error: "SOMETHING_WENT_WRONG"
        })
    }
}

const getUser = async (req, res) => {
    try {
        const merchant = await Merchant.findById(req.user.id)
        console.log(merchant)
        return res.status(200).json({
            merchant
        })
    } catch (error) {
        return res.status(500).json({ error: "SERVER_ERROR" })
    }
}

module.exports = {
    registerMerchant,
    loginMerchant,
    googleLogin,
    getUser
}
