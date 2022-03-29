const { Collection } = require("mongoose")

const Product = require("../models/product.model")

const Order = require("../models/order.model")


const checkout = async (req, res) => {

    var prods = []

    try{
        var{
            products,
            total,
            
          
    } = req.body

    var notOk = false;
    await Promise.all(products.map(async (element) => {
        
        const product = await Product.findOne({
            _id: element._id,
            storeId: req.storeId
             })

             

             if (product.stock < element.qty){
                notOk = true
                
                
            } 

        return product

    }));
    if( notOk === false){

        products.map(async (item)=>{

            const product = await Product.findOne({
                _id: item._id,
                storeId: req.storeId
                })


                
                console.log('reducing' , product)
                product.stock = product.stock - item.qty
                await product.save()
        
            })

            const order = new Order({
                total : total,
                products : products.map(p => ({...p, product:p._id})),
            
            })

            await order.save()
            console.log( 'order', order)

            
            return res.status(200).json({
                order
            })

        }

        else{
            return res.status(400).json({
                error: "STOCK_ERROR"
            })
        }
       
    }
    catch (err) {
        console.log(err)

        return res.status(500).json({
            error: "SERVER_ERROR"
        })
    }
}


module.exports = {
    checkout

}