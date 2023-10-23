const { Promise } = require("mongoose")

module.exports = (theFunc) => (req, res, next)=>{
    Promise.resolve(theFunc(req, res, next)).catch(next);
}
//function coming from controller file goes in theFunc, 
//promise.resolve work as try i.e try to solve otherwise catch next error