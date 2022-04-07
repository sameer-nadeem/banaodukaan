const Order = require("../models/order.model")
const Brand = require("../models/brand.model")

const getAnalytics = async (req, res) => {

    console.log("ok")
    const orders = await Order.find({
        storeId: req.storeId
    })
    .populate(['products.product'])
    var dict = {}
    var dictBrand = {}

    orders.forEach (order =>{
        var products = order.products
        console.log(products)
        products.forEach(product => {
            let prod = product.product.title;
            let brand = product.product.brandId;
            console.log(brand)
            if (prod in dict === true) {
                console.log(1)
                dict[prod] = dict[prod] + product.qty
            }
            else {
                console.log(2)
                dict[prod] = product.qty
            }
            if (brand in dictBrand === true) {
                console.log(1)
                dictBrand[brand] = dictBrand[brand] + product.qty
            }
            else {
                console.log(2)
                dictBrand[brand] = product.qty
            }
            


            
        })
    }) 

    dictBrandName ={}
    for (x in dictBrand) {
        var brandName = await Brand.findOne({_id: x})
        dictBrandName[brandName.name] = dictBrand[x]
    }
    console.log(dictBrandName)
    

    return res.status(200).json({ordersSales : dict,
                                BrandSales : dictBrandName
    })
}

module.exports = {
    getAnalytics
}
