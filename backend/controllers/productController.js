const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAyncError = require("../middleware/catchAsyncError");
const ApiFeatures = require("../utils/apiFeatures");
const catchAsyncError = require("../middleware/catchAsyncError");


//create product API - admin
exports.createProduct = catchAyncError(async (req, res, next)=>{
    //take req.body.user from schema same as req.body.name
    req.body.user = req.user.id;
    const product = await Product.create(req.body);
    res.status(201).json({
        success:true,
        product
    })
});
//now omport in route

//GET  ALL PRODUCTS API
exports.getAllProducts = catchAyncError (async (req,res) =>{
  
    const resultPerPage = 8;
    const productsCount = await Product.countDocuments();
    const apiFeatures = new ApiFeatures(Product.findOne(),req.query)
    .search()
    .filter();

    //now we will count products available after applying search and filter query
    let allProducts = await apiFeatures.query;
    let filteredProductsCount = allProducts.length;

    apiFeatures.pagination(resultPerPage);

    //use clone as below query is already executed above
    allProducts = await apiFeatures.query.clone();
    res.status(200).json({
        success:true,
        allProducts,
        productsCount,
        resultPerPage,
        filteredProductsCount
    });
});

//GET SINGLE PRODUCT DETAILS
exports.getProductDetail = catchAyncError (async (req,res,next)=>{
    const productDetail = await Product.findById(req.params.id);
    if(!productDetail){
        // return res.status(500).json({
        //     success:false,
        //     message:"product not found"
        // });
        return next(new ErrorHandler("Product Not Found", 404));
    }
    //if found
    res.status(200).json({
        success:true,
        productDetail
    })

});

//UPDATE PRODUCT API - admin
exports.updateProduct = catchAyncError(async (req, res, next)=>{
    let product = await Product.findById(req.params.id);
    if(!product){
        return next(new ErrorHandler("Product Not Found", 404));
    }
    //else if product found
    //findByIdAndModify(id, what to update, optional)
    product = await Product.findByIdAndUpdate(req.params.id, req.body,
        {
        new:true,
        runValidators:true,
        useFindAndModify:false
        }
    );
    res.status(200).json({
        success:true,
        product
    })
});

//DELETE PRODUCT
exports.deleteProduct = catchAyncError (async(req, res, next)=>{
    const product = await Product.findById(req.params.id);
    if(!product){
        return next(new ErrorHandler("Product Not Found", 404));
    }
    //product delete itself
    await product.remove();
    res.status(200).json({
        success:true,
        message:"Product delete successfully"
    })
});

//update product review or create new review
exports.CreateProductReview = catchAsyncError(async(req, res, next)=>{
    const {rating, comment, productId} = req.body;
    const newReview={
        user: req.user._id,
        name:req.user.name,
        rating:Number(rating),
        comment,
    }
    const product = await Product.findById(productId);
    //check if user entering review already exists in reviews array
    const isReviewed = product.reviews.find(
        (rev) => rev.user.toString() === req.user._id.toString()
    );
    if(isReviewed){
        product.reviews.forEach((rev)=>{
            if(rev.user.toString() === req.user._id.toString())//check for each review
                (rev.rating = rating),
                (rev.comment = comment)
        });
    }
    else{
        //create new review
        product.reviews.push(newReview);
        product.numberOfReviews = product.reviews.length;//increment total reviews
    }

    //calculate overall ratings 4,5,5,5,2,3
    let avg=0;
     product.reviews.forEach((rev)=>{
        avg+=rev.rating
    })
    product.ratings = avg/ product.reviews.length

    await product.save({validateBeforeSave : false});
    res.status(200).json({
        success:true
    });

});

//GET REVIEW OF A PRODUCT
exports.getProductReview= catchAsyncError(async(req, res,next)=>{
    const product = await Product.findById(req.query.id);
    if(!product){
        return next(new ErrorHandler("Product not found", 404));
    }
    res.status(200).json({
        success:true,
        reviews:product.reviews
    });
});

//DELETE REVIEW
exports.deleteReview = catchAsyncError(async(req, res, next)=>{
    const product = await Product.findById(req.query.productId);
    if(!product){
        return next(new ErrorHandler("Product not found", 404));
    }
    //retrun all reviews that we want and delete review that we dont need
    const reviews = product.reviews.filter(
        (rev)=>
        rev._id.toString() != req._id.toString()
    )
    let avg =0;
    reviews.forEach((rev)=> avg+= rev.rating);
    const ratings= avg / reviews.length;
    const numberOfReviews = reviews/length;

    //update reviews and ratings
    Product.findByIdAndUpdate(req.query.productId,{
        reviews, ratings, numberOfReviews
    },{
        new:true,
        runValidators :true,
        userFindAndModify: false
    })
    res.status(200).json({
        success:true
})
});

