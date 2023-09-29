// import carts model
const carts=require('../models/cartSchema')

//add to cart collection
exports.addToCart=async(req,res)=>{

    // get product details from the request
    const{id,title,price,image,quantity}=req.body

    //logic-
    try{

        //check if the product is already in cart
          const products=await carts.findOne({id})
          if(products){
            //product is present update the quantity and price accordingly
            products.quantity+=1

            //update the grand total
            products.grandTotal=products.price*products.quantity
            
            //save changes to the db
            products.save()

            //send response back to the client 
            res.status(200).json("Product details updated")
          }
          else{
            //products is not present in the cart, Add product to cart
            const newProduct=new carts({
                id,title,price,image,quantity,grandTotal:price
            })

            //save new product details
            newProduct.save()

            //send response back to client
            res.status(200).json("Product added successfully")
          }

    }
    catch{
        req.status(404).json(error)
    }
}

//get cart product
exports.getCart= async (req,res)=>{

  //get cart product from the database
  try{
    const allcart=await carts.find()
    res.status(200).json(allcart)
  }
  catch{
    
  }
}
  //delete a product from the cart
  exports.deleteCartProduct=async(req,res)=>{
    const{id}=req.params
      //remove product from cart
    try{
         const removedProduct=await carts.deleteOne({id})//product deleted
         //get remaining products details after deleting a particular product
         if(removedProduct.deleteCount!=0){
          //get all remaining products from cart
          const allProducts=await carts.find()
          res.status(200).json(allProducts)//response send back to client
         }
    }
    catch(error){
      res.status(404).json(error)
    }
  
}

//Increment the cart product count
exports.incrementProductCount = async(req,res)=>{
  //find product id
  const {id}=req.params
  //if the product is already in the cart then quantity will be incremented by 1
    //then update the grand total
   try{
       const product = await carts.findOne({id})
       if(product){
        product.quantity+=1;//increment the quantity by 1
        product.grandTotal=product.price*product.quantity
        //save changes to db
      await  product.save()
        //after the product has been saved , update the content into the client side
        const allCart=await carts.find()
        res.status(200).json(allCart)
       }
       else{
        res.status(401).json("Product not found")
       }
   }
   catch(error){
    res.status(404).json(error)
   }
}

//Decrement the cart product count
exports.decrementProductCount = async(req,res)=>{
  //find product id
  const {id}=req.params
  try{
    const product = await carts.findOne({id})
    if(product){
      product.quantity-=1;//decrement the quantity by 1
      if(product.quantity==0){
        //remove the product from the cart
        await carts.deleteOne({id})
        //remaining product will be send back to client
        const allCart= await carts.find()
        res.status(200).json(allCart)
      }
      else{
        product.grandTotal=product.price*product.quantity
        ///save changes to db
       await product.save()
        //after the product has been saved , update the content into the client side
        const allCart=await carts.find()
        res.status(200).json(allCart)
      }
    
  
  }
  else{
    res.status(404).json("Product Not Found")
  }
}

  
catch(error){
res.status(404).json(error)
}
}
