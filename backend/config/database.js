const mongoose = require("mongoose");

//creating function 
const connectDatabase = ( )=>{
    //mongoose.connect("mongo://localhost:27017/Ecommerce"
//when host on online cloud will not change url again and again so using
//process.env.DB_URI
mongoose.connect(process.env.DB_URI,{useNewUrlParser:true,
    useUnifiedTopology:true}).then((data)=>{
        console.log('Mongodb is connected with server:'+ data.connection.host);
    });
}

module.exports = connectDatabase