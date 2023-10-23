const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");


//handle unCaught Error 
process.on("uncaughtException",(err) =>{
    console.log("Error: "+err.message);
    console.log("shutting down server due to uncaught Exception ");

    process.exit(1);
});

//config
dotenv.config({path:"backend/config/config.env"});

//calling connect databse function ..use after config..otherwise will not get process.env value
connectDatabase();

const server = app.listen(process.env.PORT,() =>{
    console.log('server is running at port http://localhost:'+process.env.PORT);
});


//unhandled promise rejection
process.on("unhandledRejection",(err)=>{
    console.log("Error: ${err.messge}");
    console.log("shutting down server due to unhandled Promise Rejection");
    // immediate close server ie line 11
    server.close(()=>{
        process.exit(1);
    });
});



//Unhandled Promise Rejection - if connection string is wrong i.e mongo:// instaed of mongodb
//uncaught Exception - console.log(youtube) give error youtube not defined