const Order = require("../models/order.model")
const Brand = require("../models/brand.model")
const { ConnectionStates } = require("mongoose")

const getAnalytics = async (req, res) => {

    const orders = await Order.find({
        storeId: req.storeId
    })
    .populate(['products.product'])
    var dict = {}
    var dictBrand = {}

    orders.forEach (order =>{
        var products = order.products
        products.forEach(product => {
            let prod = product.product.title;
            let brand = product.product.brandId;
            if (prod in dict === true) {
                dict[prod] = dict[prod] + product.qty
            }
            else {
                dict[prod] = product.qty
            }
            if (brand in dictBrand === true) {
                dictBrand[brand] = dictBrand[brand] + product.qty
            }
            else {
                dictBrand[brand] = product.qty
            }
            


            
        })
    }) 

    const productsSort = Object.entries(dict)
    .sort(([,a],[,b]) => a-b)
    .reverse()
    .splice(0,12)
    .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});

    const sortable = Object.entries(dictBrand)
    .sort(([,a],[,b]) => a-b)
    .reverse()
    .splice(0,12)
    .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});

    console.log(sortable);    


    dictBrandName ={}
    for (x in sortable) {
        var brandName = await Brand.findOne({_id: x})
        dictBrandName[brandName.name] = sortable[x]
    }

    return res.status(200).json({ordersSales : dict,
                                BrandSales : dictBrandName
    })
}

const getSalesbyDate = async (req, res) => {
    console.log('getSalesbyDate')
    const sales = await Order.aggregate([
        {$match: {storeId: req.storeId}},
        {$group : {_id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
    sales: {$sum : "$total"}
    }},
    {$sort: {_id : -1}},
    {$limit : 5}
    ])
    
    return res.status(200).json({sales
})

}

const getOrdersInfo = async (req, res) => {
    console.log('getSalesbyDate')
    const orders = await Order.aggregate([
        {$match: {storeId: req.storeId}},
        {$group : {_id: "$isDelivered",
    sales: {$sum : 1}
    }},
    ])

    console.log(orders)
    
    return res.status(200).json({orders
})

}


const getBrandSales = async (req, res) => {

    const orders = await Order.find({
        storeId: req.storeId
    })
    .populate(['products.product'])
    var dict = {}
    var dictBrand = {}

    orders.forEach (order =>{
        var products = order.products
        products.forEach(product => {
            let prod = product.product.title;
            let brand = product.product.brandId;
            if (brand in dictBrand === true) {
                dictBrand[brand] = dictBrand[brand] + product.qty
            }
            else {
                dictBrand[brand] = product.qty
            }
            


            
        })
    }) 

    const sortable = Object.entries(dictBrand)
    .sort(([,a],[,b]) => a-b)
    .reverse()
    .splice(0,3)
    .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});

    console.log(sortable);    


    dictBrandName ={}
    for (x in sortable) {
        var brandName = await Brand.findOne({_id: x})
        dictBrandName[brandName.name] = sortable[x]
    }
    

    return res.status(200).json({
                                BrandSales : dictBrandName
    })
}




module.exports = {
    getAnalytics,
    getSalesbyDate,
    getOrdersInfo,
    getBrandSales,
}
