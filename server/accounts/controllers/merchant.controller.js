const express = require('express')
const Merchant = require('../../models/merchant.model')
const User = require('../../models/user.model')
const Store = require('../../models/store.model')
const Settings = require('../../models/setting.model')
const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')

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
        } = req.body

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
            settings: settings._id
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
            country,
            city,
            phone,
            adress,
            postalCode,
            website,
        } = req.body

        const store = await Store.findById(storeId)

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


module.exports = {
    getMyStores,
    addStore,
    viewMyProfile,
    updateMyProfile,
    getStore,
    updateStore,
    updateMyPassword

}
