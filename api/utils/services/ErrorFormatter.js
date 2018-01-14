const BadRequestError = require('../errors/BadRequestError');
const UnknownError = require('../errors/UnknownError');

class ErrorFormatter {
    static createResponseError(error) {
        switch (error.name) {
            case "ValidationError":
                return new BadRequestError("Validation errors in your request", ErrorFormatter.formatOrmValidationErrors(error.errors));
            case "CastError":
                return new BadRequestError("Validation errors in your request", ErrorFormatter.formatOrmCastErrors(error));
            default:
                return new UnknownError("Oops! Something went wrong");
        }
    }

    static formatOrmValidationErrors(errors) {
        const errorsObject = {};
        for (const errorField in errors) {
            let errorType = "";
            let value = "";
            let message = "";
            if (errors[errorField].name === 'CastError') {
                errorType = "Data Type";
                value = errors[errorField].stringValue;
                message = `${errorType} Error: Value ${value}`;
            } else if (errors[errorField].name === 'ValidatorError' && errors[errorField].kind === 'required') {
                errorType = "Required Field";
                value = errors[errorField].properties.value;
                message = `${errorType} Error: Value ${value}`;
            } else if (errors[errorField].name === 'ValidatorError' && errors[errorField].kind === 'user defined') {
                value = errors[errorField].properties.value
                message = `${errors[errorField].message} ${value}`;
            }
            else {
                errorType = "Unknown";
                value = errors[errorField].properties.value;
            }
            errorsObject[errorField] = {
                message: message
            }
        }
        return errorsObject;
    }

    static formatOrmCastErrors(error){
        const errorsObject = {}
        let errorType = "Data Type";
        let value = error.stringValue;
        let message = `${errorType} Error: Value ${value}`;
        errorsObject[error.path] = {
            message: message
        };
        return errorsObject;
    }
}

module.exports = ErrorFormatter;