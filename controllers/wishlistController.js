//logic for wishlist
//import wishlist model

const wishlists = require ('../models/wishlistSchema')

//logic for add wishlist

exports.addToWishlists=async(req,res)=>{
  //get product details

  // use destructuring
  const {id,title,price,image} = req.body;
  
      //logic
  try{
      //check if the product is already in wishlist

    const item = await wishlists.findOne({id})
  if(item){
    res.status(403).json('product is already added')
  }
  else{
    //add a new product to the wishlists
    const newProduct = new wishlists({id,title,price,image})
    //to store the new product in the wishlists
    await newProduct.save()
    //send response back to the client
    res.status(200).json('product added to wishlist successfully')
  }
  }
  catch(error){
    res.status(401).json(error)
  }

}

//get all wishlists products

exports.getWishlistItems = async(req,res)=>{
  //logic
  try{
    const allWishlist = await wishlists.find()
    res.status(200).json(allWishlist)//wishlist product details
  }
  catch(error){
    res.status(404).json(error)
  }
}

//delete a particular product from the wishlists

exports.deleteProduct=async(req,res)=>{
  //logic -m id get - delete - remaining product details
  //get id from path parameter
  //destructuring
  const{id}=req.params

  try{
       const removedProduct=await wishlists.deleteOne({id})
       //get remaining products details after deleting a particular product
       if(removedProduct){
        const allItems=await wishlists.find()
        res.status(200).json(allItems)
       }
  }
  catch(error){
    res.status(404).json(error)
  }
}