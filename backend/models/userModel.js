const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto"); //pre loaded in node js

 const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Enter Your Name"],
        maxLength:[30, "Name cannot exceed 30 characters"],
        minLength:[4, "Name should be atleast 4 characters"]
    },
    email:{
        type:String,
        required:[true,"Please Enter Your Email"],
        unique:true,
        validate:[validator.isEmail,"Plesae Enter Valid Email"]
    },
    password:{
        type:String,
        required:[true,"Please Enter Your Password"],
        minLength:[8, "Name should be greater than 8 characters"],
        select:false
    },  
    avatar:{ // willbe array of object because of multiple images
           //when host in cloud will get public id and url
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    },
    role:{
        type:String,
        default:"user"
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
 });

 // not using arrow function bcz this keyword cannot be used inside arror function
 //pre("save") -- becomes event
 userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        next();
    }
    this.password = await bcrypt.hash(this.password,10)
 })

 //jwt token ..user register and immediately login, 
 //create cookie and expire session
 userSchema.methods.getJWTToken = function(){
    return jwt.sign({id: this.id}, process.env.JWT_SECRET,{
        expiresIn : process.env.JWT_EXPIRE,
    });
 }

 //COMPARE PSWD METHOD
 userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password,this.password)
    //compare user entered pwsd with hashed pswd
 } 

 //GENERATING RESET PASSWORD TOKEN
 userSchema.methods.getResetPasswordToken = function(){

    //generatong token
    const resetToken = crypto.randomBytes(20).toString("hex");

    //Hashing and adding resetPasswordToken to schema
    this.resetPasswordToken = crypto.createHash("sha256")
    .update(resetToken)
    .digest("hex");

    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000; //min * sec * milliseconds
    return resetToken;

 }

 module.exports = mongoose.model("User", userSchema);
 //import in controller