const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("./catchAsyncError");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.isUserLogin = catchAsyncError(async(req,res,next)=>{
    const {token} = req.cookies;
    if(!token){
        return next(new ErrorHandler("Please login to access this resource",401))
    }
    const decodedCode = jwt.verify(token, process.env.JWT_SECRET);

    //id created while creating jwt token in model.js
    //can access user data with req
    req.user = await User.findById(decodedCode.id);
    next();//callback function
});

exports.authorizeRoles = (...roles) =>{
    return (req,res,next) =>{
        //from lin1 15 req.user getting whole detail of user 
        // so check is that role matches with role in model defined
        if(!roles.includes(req.user.role)){
            return next
            (new ErrorHandler(
                'Role:'+ req.user.role+ 'is not allowed to access this role',
                403
                )
            );
        }
        //else
        next();
    };
};


