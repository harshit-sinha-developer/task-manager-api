class NotFoundError extends Error {
    constructor(message){
        super(message);
        this.httpCode = 404;
    }
}

module.exports = NotFoundError;