const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const sentToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");


exports.registerUser = catchAsyncError( async (req, res,next) =>{
    const {name, email, password} = req.body;

    const user = await User.create({
        name,email,password,avatar:{
            public_id:"This is sample id",
            url:"profilePicture1"
        }
    });

    sentToken(user, 201, res);
});

//LOGIN USER
exports.loginUser = catchAsyncError(async(req, res, next)=>{
    const {email,password} = req.body;

    //check is user has entered both , if not raise error
    if(!email || !password){
        return next(new ErrorHandler("PLease Enter Email & Password", 401));
    }

    //find user from database
    const user = await User.findOne({email}).select("+password") //pswd is false in model
    if(!user){
        return next(new ErrorHandler("Invalid Email or Password",401));
    }

    const isPasswordMatched = await user.comparePassword(password);//method in model.js
    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid Email or Password",401));
    }

    //if found calling sent token from utils
    sentToken(user, 200, res);    
});

//LOGOUT
exports.logout = catchAsyncError(async(req,res, next)=>{
    //sending cookie to jwtToken.js in utils to expire session now
    res.cookie("token",null,{
        expires:new Date(Date.now()),
        httpOnly : true
    })
     res.status(200).json({
        success:true,
        message:"Loggout out successfully"
     })
});

//FORGOT PASSWORD
exports.forgotPassword = catchAsyncError(async(req, res, next)=>{
    const user = await User.findOne({email: req.body.email})
    if(!user){
        return next(new ErrorHandler("User not found",404))
    }

    //get reset passwordtoken created in model
    const resetToken = user.getResetPasswordToken();
    //save user who already login
    await user.save({validateBeforeSave : false})
    //send user email link to reset apssword
    const resetPasswordUrl = req.protocol+'://'+req.get("host")+'/api/v1/reset/'+resetToken
    const message = 'Your password reset token is :- \n\n' +resetToken+'\n\nIf you have not requested this email then, please ignore it';

    try{
        await sendEmail({
          email: user.email,
          subject:'D-Moon password recovery',
          message,
        });
        res.status(200).json({
            success:true,
            message:'Email send to '+user.email+' successfully'
        });
    }
    catch(error){
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire =undefined;

        await user.save({validateBeforeSave : false});
        return next(new ErrorHandler(error.message,500));
    }
});

//RESET PASSWORD
exports.resetPassword = catchAsyncError(async(req, res,next)=>{
    //creating token hash
   const resetPasswordToken = crypto
   .createHash("sha256")
    .update(req.params.token)//token that sent in url for reset password mail
    .digest("hex");

    //find user in database that matches token
    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire :{gt:Date.now()}//expire date should be greater than now
    })

    if(!user){
        return next(new ErrorHandler("Reset passord token is invalid or has been invalid",500));
    }
    if(req.body.password!==req.body.confirmPassword){
        return next(new ErrorHandler("Password does not match",500));
    }

    //else
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire =undefined;// undefine till user forgot new password/ clcik on forgot password
    
  await user.save();
  //immediately login user after change password
  sentToken(user,200,res); 

});


//GET USER DETAILS
exports.getUserDetails = catchAsyncError(async(req,res,next)=>{
    const user = await User.findById(req.user.id);
    //can access who are logged in , so will not add condition (!user)
    res.status(200).json({
        success:true,
        user
    });
});


//UPDATE USER PASSWORD
exports.updatePassword = catchAsyncError(async(req,res,next)=>{
    const user = await User.findById(req.user.id).select("+password");
    

    //Enter old password
    const isPasswordMatched= await user.comparePassword(req.body.oldPassword);//method in model.js
   
    if(!isPasswordMatched){
        return next(new ErrorHandler("Old password is incorrect",400));
    }
    
    if(req.body.newPassword !==req.body.confirmPassword){
        return next(new ErrorHandler("Password does not match",400));
    }

    user.password = req.body.newPassword;
    await user.save();
    sentToken(user, 200, res);
});


//update profile
exports.updateProfile = catchAsyncError(async(req,res,next)=>{
    const newUserData={
        name:req.body.name,
        email:req.body.email
    }

    const user = await User.findByIdAndUpdate(req.user.id,newUserData,{
        new:true,
        runValidators:true,
        userFindAndModify:false
    });
    res.status(200).json({
        success:true
    })

});

//GET ALL USERS -ADMIN
exports.getAllUsers = catchAsyncError(async(req,res,next)=>{
    const users = await User.find();
    res.status(200).json({
        success:true,
        users
    });
});

//GET SINGLE USER DETAILS -- ADMIN
exports.getSingleUser = catchAsyncError(async(req,res,next)=>{
    const user = await User.findById(req.params.id);
    if(!user){
        return next(new ErrorHandler("User does not exist with id "+req.params.id));
    }
    res.status(200).json({
        success:true,
        user
    });
});

//UPDATE USER ROLE -- admin
exports.updateUserRole = catchAsyncError(async(req,res,next)=>{
    const newUserData={
        name:req.body.name,
        email:req.body.email,
        role:req.body.role
    }
    //add cloudinary later

    const user = await User.findByIdAndUpdate(req.params.id,newUserData,{
        new:true,
        runValidators:true,
        userFindAndModify:false
    });
    res.status(200).json({
        success:true
    })

});

//DELETE USER -- admin
exports.RemoveUser = catchAsyncError(async(req,res,next)=>{
    const user = await User.findById(req.params.id);
    if(!user){
        return next(new ErrorHandler("User does not exist with id "+req.params.id));
    }
    await user.remove();

    res.status(200).json({
        success:true
    })

});


