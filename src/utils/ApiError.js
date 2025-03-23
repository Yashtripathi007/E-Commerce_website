class ApiError extends Error {
    constructor(
        statusCode,
         message="something went wrong",
         stack="",
          errors = []) {
        super(message);
        this.statusCode = statusCode;
        this.data=null;
        this.errors = errors;
        this.success = false;
          
        if(stack){
            this.stack=statck
        }else{
            Error.captureStackTrace(this, this.constructor);
        }
        // Capture the stack trace (removes constructor call from it)
       
    }
}

export default ApiError;