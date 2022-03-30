const express = require('express')
const Merchant = require('../../models/merchant.model')
const User = require('../../models/user.model')
const Store = require('../../models/store.model')
const Settings = require('../../models/setting.model')
const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')
const multer = require('multer')
const path = require("path")

const Storage = multer.diskStorage({
    destination: "./uploads/images",
    filename: function (req, file, cb) {
      cb(null, "IMAGE-" + Date.now() + path.extname(file.originalname));
    }
  })
  
  const uploadLogo = multer({
    storage: Storage,
    limits: { fileSize: 1000000 },
  }).single('myLogo')

  const uploadCover = multer({
    storage: Storage,
    limits: { fileSize: 1000000 },
  }).single('myCover')

const getMyStores = async (req, res) => {

    const id = req.user.id

    try {
        const merchant = await Merchant.findOne({ _id: id }).populate('myStores')
        stores = merchant.myStores

        return res.status(200).json({
            stores
        })
    } catch (err) {
        return res.status(500).json({
            error: "Server Error"
        })
    }


}

const addStore = async (req, res) => {

    const id = req.user.id
    try {
        const merchant = await Merchant.findOne({ _id: id })
        var {
            title,
            country,
            city,
            phone,
            adress,
            postalCode,
            website,
            logo,
            cover
        } = req.body

        const storeWithSameNameExists = await Store.exists({ title })
        if (storeWithSameNameExists) {
            return res.status(400).json({ error: "STORE_ALREADY_PRESENT" })
        }

        const settings = new Settings({
            country,
            city,
            phone,
            localPickupAddress: adress,
            postalCode,
            website,
        })
        settings.save()

        const store = new Store({
            title,
            products: [],
            orders: [],
            discountCodes: [],
            complaints: [],
            settings: settings._id,
            logo: logo,
            cover: cover
        })
        await store.save()
        merchant.myStores.push(store._id)
        await merchant.save()

        return res.status(200).json({
            store
        })

    }
    catch (err) {
        console.log(err)
        return res.status(500).json({
            error: "Server Error"
        })
    }

}

const viewMyProfile = async (req, res) => {

    const id = req.user.id

    try {
        const merchant = await Merchant.findOne({ _id: id })


        return res.status(200).json({
            merchant
        })
    } catch (err) {
        return res.status(500).json({
            error: "Server Error"
        })
    }


}

const updateMyProfile = async (req, res) => {

    const id = req.user.id

    try {

        var {
            firstName,
            lastName,
            email
        } = req.body

        const merchant = await Merchant.findOne({ _id: id })
        merchant.firstName = firstName
        merchant.lastName = lastName
        merchant.email = email

        await merchant.save()

        return res.status(200).json({
            merchant
        })
    } catch (err) {
        return res.status(500).json({
            error: "Server Error"
        })
    }


}

const updateMyPassword = async (req, res) => {

    const id = req.user.id

    try {

        var {
            password,
            newPassword
        } = req.body

        const merchant = await Merchant.findOne({ _id: id })
        const passMatch = await bcrypt.compare(password, merchant.password)
        if (passMatch) {
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(newPassword, salt)
            merchant.password = hashedPassword

            merchant.save()
        }
        else {
            return res.status(400).json({
                error: "Invalid Password"
            })
        }

        return res.status(200).json({
            merchant
        })
    } catch (err) {
        return res.status(500).json({
            error: "Server Error"
        })
    }


}

const getStore = async (req, res) => {
    const id = req.user.id
    const storeId = req.params.id
    console.log(storeId)
    try {

        const store = await Store.findById(storeId).populate("settings")
        storeInfo = store
        console.log("dnnnnn", storeInfo)
        return res.status(200).json({
            storeInfo
        })
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            error: "Server Error"
        })
    }


}

const updateStore = async (req, res) => {

    const id = req.user.id
    const storeId = req.params.id
    try {
        var {
            title,
            country,
            city,
            phone,
            adress,
            postalCode,
            website,
            logo,
            cover,
            orders,
            complaints,
            products
        } = req.body

        const store = await Store.findById(storeId)

        store.title = title
        store.logo = logo
        store.cover = cover
        store.orders = orders
        store.products = products
        store.complaints = complaints
        await store.save()

        const settings = await Settings.findById(store.settings)

        settings.country = country
        settings.city = city
        settings.phone = phone
        settings.localPickupAddress = adress
        settings.postalCode = postalCode
        settings.website = website
        await settings.save()

        return res.status(200).json({
            store
        })

    }
    catch (err) {
        console.log(err)
        return res.status(500).json({
            error: "Server Error"
        })
    }

}


const validateStore = async (req, res) => {
    const storeTitle = req.query.store
    const isValid = !(await Store.exists({ title: storeTitle }))
    res.status(200).json({ isValid })
}

const uploadStoreCover = (req, res) => {
    uploadCover(req, res, (err) => {
      console.log(req.file.path)
      res.send(`/${req.file.path}`)
    })
  }
  const uploadStoreLogo = (req, res) => {
    uploadLogo(req, res, (err) => {
      console.log(req.file.path)
      res.send(`/${req.file.path}`)
    })
  }

module.exports = {
    getMyStores,
    addStore,
    viewMyProfile,
    updateMyProfile,
    getStore,
    updateStore,
    updateMyPassword,
    validateStore,
    uploadStoreCover,
    uploadStoreLogo
}
