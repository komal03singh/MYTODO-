class ApiResponse{
    constructor(StatusCode, data , message,token){
        this.StatusCode =StatusCode
        this.data=data
        this.message = message
        this.token = token
        this.success = StatusCode < 400
    }
}

export {ApiResponse}