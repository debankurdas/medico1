const productSchema = require('../models/productSchema');

exports.addProduct = (req, res,next) => {
 url = req.protocol+'://'+req.get('host');
  const product = new productSchema({
    productName: req.body.productName,
    categoryName:req.body.categoryName,
    description:req.body.description,
    imageUrl: url+'/images/'+ req.file,
    price: req.body.price
  });
  product.save()
  .then((requestedData) => {
    res.status(200).json({
      status: 'Success',
      message:'products are succesfully added',
      data: requestedData
    });
  })
  .catch((error) => {
    res.status(500).json({
      status: 'Failed',
      message: error
    });
  });
}
exports.getProduct = (req,res,next) => {
  productSchema.find()
  .then((product) =>{
    if (product) {
      res.status(200).json({
        message:'Product is successfully fetched',
        data:product
      });
    } else {
      res.status(401).json({message: 'Product is not found'});
    }
  })
  .catch(error => {
    res.status(401).json({
      message: 'Product is not fetched!',
      error:error
    });
  });
}
exports.getProductById = (req,res,next) => {
  const productId = req.params.id;
  productSchema.findById(productId)
  .then((product) =>{
    if (product) {
      res.status(200).json({
        message:'Product is successfully fetched',
        data:product
      });
    } else {
      res.status(401).json({message: 'Product is not found'});
    }
  })
  .catch(error => {
    res.status(401).json({
      message: 'Product is not fetched!',
      error:error
    });
  });
}

exports.getproductByCategory = (req,res,next) => {
  const category = req.body.categoryName;
let productCount=0;
productSchema.find().estimatedDocumentCount().exec()
.then((countResult) => {
 productCount = countResult;
 return productCount;
})
.then((resultcount) => {
  productSchema.find({categoryName: category})
  .then((result) => {
    res.status(200).json({
      message:'Category wise product fetched!',
      data:result,
      count: resultcount
    });
  })
  .catch((err) => {
    res.status(200).json({
      message:'Product is not fetched!',
      error: err
    });
  });
});
}
exports.searchProduct = (req,res,next) => {
  const product = req.body.productName;
let productCount=0;
productSchema.find().estimatedDocumentCount().exec()
.then((countResult) => {
 productCount = countResult;
 return productCount;
})
.then((resultcount) => {
  productSchema.find({productName:{ $regex: product , $options:'i'}})
  .then((result) => {
    res.status(200).json({
      message:'Category wise product fetched!',
      data:result,
      count: resultcount
    });
  })
  .catch((err) => {
    res.status(200).json({
      message:'Product is not fetched!',
      error: err
    });
  });
});
}
exports.updateProduct = (req, res,next) => {
  const  productId = req.body._id
  productSchema.findByIdAndUpdate(productId,{
    $set:{
      description:req.body.description,
      price:req.body.price,
      outOfStock:req.body.outOfStock
    }
  })
  .then((updatedResult) => {
    console.log(updatedResult);
     res.status(200).json({
       status: 'Success',
       message:'Product is updated',
       data:updatedResult
     });
  })
  .catch((error) =>{
    res.status(500).json({
      message:'Product is not updated',
      error: error
    });
  });
 };

