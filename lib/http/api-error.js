module.exports = class ApiError extends Error {
    constructor(message, code = 2, httpStatusCode = 500) {
        super(message);
        this.code = code;
        this.name = this.constructor.name;
        this.httpStatusCode = httpStatusCode;
    }

    response() {
        return {
            code: this.code,
            message: this.message,
        };
    }
};
