class ErrorHandler extends Error{
    constructor(message,status){
        super(message); //message that comes from parameter
        this.status = status;

        Error.captureStackTrace(this,this.constructor);
    }
}

module.exports = ErrorHandler
//cannot use dirctly , for this will create middleware file