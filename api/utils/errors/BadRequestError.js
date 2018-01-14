class BadRequestError extends Error {
    constructor(message, errors){
        super(message);
        this.errors = errors;
        this.httpCode = 400;
    }
}

module.exports = BadRequestError;