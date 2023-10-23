const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next)=>{
    err.statusCode = err.statusCode || 500; //get statusCode else ststusCode 500
    err.message = err.message || "Internal Server Error";

    //Wrong mongodb id error
    if(err.name === "CastError"){
        const message ="Resource not found. Invaild: ${err.path}";
        err = new ErrorHandler(message, 404);
    }

    //Mongoose duplicate key error - if email already exists
    if(err.code === 11000){
        const message = 'Duplicate '+Object.keys(err.keyValue)+' entered';
        err = new ErrorHandler(message, 404);
    }

    //json token error
    if(err.name === "JsonWebTokenError"){
        const message ="json web token is invalid. Try again";
        err = new ErrorHandler(message, 404);
    }

    //json token expire
    if(err.name === "TokenExpiredError"){
        const message ="json web token is expired. Try again";
        err = new ErrorHandler(message, 404);
    }

    res.status(500).json({
        success:false,
        message:err.message
    });
}

//use it in app.js