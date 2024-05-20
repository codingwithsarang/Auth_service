const {StatusCodes} = require('http-status-codes')

class AppError extends Error{

    constructor(name="App Error", message='Something went wrong', statusCode=StatusCodes.INTERNAL_SERVER_ERROR, explanation = 'Something went wrong'){
         super()
         this.message = message,
         this.name = name,
         this.statusCode = statusCode,
         this.explanation = explanation
    }
}

module.exports = AppError