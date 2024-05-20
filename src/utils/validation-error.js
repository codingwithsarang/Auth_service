const AppError = require('./error-handler')
const { StatusCodes} = require('http-status-codes')

class ValidationError extends AppError{
    constructor(error){
        let errorName = error.name;
        let explanation = [];

        error.errors.forEach(err => {
            explanation.push(err.message)
        });

        super(
        errorName,
        "Not able to validate the data sent in request",
        StatusCodes.BAD_REQUEST,
        explanation
     )
    }
}

module.exports = ValidationError