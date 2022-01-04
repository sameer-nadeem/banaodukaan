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

const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client("1008574452559-43bj1lusj5shgu89fb0hpgkqlkglk91j.apps.googleusercontent.com");

const googleLogin = async (req,res) => {
    const {tokenId} = req.body // token id received from frontend
    console.log(req.body) 

    try {
        const response = await client.verifyIdToken({idToken: tokenId, audience: "1008574452559-43bj1lusj5shgu89fb0hpgkqlkglk91j.apps.googleusercontent.com"})
        const { email_verified, name, email, given_name, family_name } = response.payload

        if(email_verified){
            // email is verified -> good to go
            const exists = await User.findOne({ // find if the user exists or not
                email
            })
            
            // if it doesnt exist -> then we need to create one otherwise if it exists then we need to check if its present in 
            // merchant table or not
            // if its not present in the merchant table then we need to send an error message

            if(exists){ //login 
                //if it exists -> check if merchant 
                const user = await User.findOne({
                    email
                })
        
                const isPresent = await Merchant.exists({
                    userId: user._id
                })
        
                if (!isPresent) { //if not present in merchant then send an error message
                    return res.status(400).json({
                        error: 'USER_IS_NOT_MERCHANT'
                    })
                }

                //exists and is a merchant-> then we need to  
                const payload = {
                    type: 'Merchant',
                    id: user._id,
                }
        
                const token = jwt.sign(payload, config.get('token-secret'), { expiresIn: 360000 })
        
                return res.status(200).json({
                    token
                })
            }
            else{
                //if user doesnt exist then we need to create it
                // let password = email + config.get('secret-token') //password in this case

                const user = new User({ 
                    email,
                    password: "",
                    firstName: given_name,
                    lastName: family_name
                })

                console.log(user)
        
                await user.save() // save user
        
                const merchant = new Merchant({
                    userId: user._id,
                    myStores: []
                })

                console.log(merchant)
        
                await merchant.save() //save merchant

                const payload = {
                    type: 'Merchant',
                    id: user._id,
                }
        
                const token = jwt.sign(payload, config.get('token-secret'), { expiresIn: 360000 })
        
                return res.status(200).json({
                    token
                })
            }
        }
        else{
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






module.exports = {
    registerMerchant,
    loginMerchant,
    googleLogin,
  
}