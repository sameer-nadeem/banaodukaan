const express = require('express')
const Merchant = require('../../models/merchant.model')
const User = require('../../models/user.model')
const Store = require('../../models/store.model')
const Settings = require('../../models/setting.model')


const getMyStores  = async (req,res)=>{
    
    const id = req.params.id

    try {
        const merchant = await Merchant.findById(id)
        console.log(merchant)
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

const addStore = async  (req,res) =>{
    
    const id = req.params.id
    try{
        const merchant = await Merchant.findById(id)

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
            adress,
            postalCode,
            website,
        })
        settings.save()

        const store = new Store({
            title,
            products:[],
            orders:[],
            discountCodes:[],
            complaints:[],
            settings : settings._id
        })
        await store.save()

        merchant.myStores.push(store._id)
        await merchant.save()

        console.log("merhcant stores",merchant.myStores)
        return res.status(200).json({
            store
        })

    }
    catch(err) {
        console.log(err)
        return res.status(500).json({
            error: "Server Error"
        })
    }
    
}


module.exports = {
    getMyStores,
    addStore
}