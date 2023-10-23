const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAyncError = require("../middleware/catchAsyncError");


//CREATE NEW ORDER
exports.createOrder = catchAyncError(async(req, res, next)=>{
    const {
       shippingInfo, orderItems, 
       paymentInfo, itemPrice, 
       taxPrice, shippingPrice,totalPrice 
    } = req.body;

    const order = await Order.create({
        shippingInfo, orderItems, 
        paymentInfo, itemPrice, 
        taxPrice, shippingPrice,
        totalPrice, paidAt: Date.now(),
        user:req.user._id,
    });

    res.status(200).json({
        success:true,
        order
    });
});

//GET SINGLE ORDER
exports.getSingleOrder = catchAyncError(async(req,res,next)=>{
    //.populate ==> take user id from order and find user from user model , return name and email
    const order = await Order.findById(req.params.id).populate("user", "name email");
    if(!order){
        return next (new ErrorHandler("Order not found with this id",404))
    }
    res.status(200).json({
        success: true,
        order
    });
});

//GET USER ORDERS
exports.myOrders = catchAyncError(async(req,res,next)=>{
    //find user id from database and return all orders
    const orders = await Order.find({user:req.user._id});
    
    res.status(200).json({
        success: true,
        orders
    });
});

//GET ALL ORDERS --ADMIN
exports.getAllOrders = catchAyncError(async(req,res,next)=>{
    const orders = await Order.find();

    //find total amount
    let totalAmount=0;
    orders.forEach(order => totalAmount+= order.totalPrice);

    res.status(200).json({
        success: true,
        totalAmount,
        orders
    });
});

//UPDATE ODER STATUS
exports.updateOrderStatus = catchAyncError(async(req,res,next)=>{
    const order = await Order.findById(req.params.id);
    if(!order){
        return next(new ErrorHandler("Order not found ", 404))
    }
    if(order.orderStatus === "Delivered"){
        return next(new ErrorHandler("You have already ordered this order", 400))
    }
    //loop order array and return product id and quantity to reduce qty 
    order.orderItems.forEach(async (order) =>{
        await updateStock(order.product, order.quantity)
    });

    //send status
    order.orderStatus = req.body.status;
    if(req.body.status === "Delivered"){
        order.deliveredAt = Date.now()
    }
    await order.save({validateBeforeSave: false})
    
    res.status(200).json({
        success: true,
    });
});

async function updateStock(id, quantity){
    const product = await Product.findById(id);// find productId
    product.stock -= quantity;

    await product.save({validateBeforeSave:false})
}

//DELETE ORDERS
exports.deleteOrder = catchAyncError(async(req,res,next)=>{
    const order = await Order.findById(req.params.id);
    if(!order){
        return next(new ErrorHandler("Order not found ", 404))
    }
    await order.remove();
    
    res.status(200).json({
        success: true,
        message:"Order delete successfully"
    });
});


