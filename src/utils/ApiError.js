class ApiError extends Error {
    constructor(
        statusCode,
         message="something went wrong",
         statck="",
          errors = []) {
        super(message);
        this.statusCode = statusCode;
        this.data=null;
        this.errors = errors;
        this.success = false;
          
        if(statck){
            this.stack=statck
        }else{
            Error.captureStackTrace(this, this.constructor);
        }
        // Capture the stack trace (removes constructor call from it)
       
    }
}

export default ApiError;