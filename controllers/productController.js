//Logic for getting all products from mongodb

//1 import product collection
const products = require('../models/productSchema')

//2 Create a function for getting all products
exports.getAllProducts=async(req,res)=>{
    //Get all products from mongodb
    try{
        const allProducts = await products.find()
        res.status(200).json(allProducts)//response send back to client
    }
    catch(error){
       res.status(401).json(error)//error msg send back to client
    }
}

//view particular product details

exports.viewProducts=async(req,res)=>{
    //Get product id from the request
    const id= req.params.id;
    try{
         //check if product id is present in the db
         const product = await products.findOne({id})
         if(product){
            res.status(200).json(product)
         }
         else
         {
            res.status(404).json("Product not Found")
    }
}
    catch(error){
       res.status(404).json(error)
    }
}
