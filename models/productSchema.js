//1 import mongoose
const mongoose=require('mongoose')

//2 Define a schema for product collection and store products
        //In this only id have unique and others have same key and value.
const productSchema = new mongoose.Schema({
    id:{
        type:Number,
        required:true,
        unique:true
    },
    title:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    Image:{
         type:String,
         required:true
    },
    description:{
            type:String,
            required:true
    },
    category:{
        type:String,
        required:true
    },
    rating:{
        rate:{
            type:Number,
            required:true
        },
        count:{
            type:Number,
            required:true
        }
    }
})

//3 Create a Model to store products
const products = new mongoose.model('products',productSchema)                    //model name = products
                                                                                 //schema name = productSchema

//4 Export the Model
module.exports=products