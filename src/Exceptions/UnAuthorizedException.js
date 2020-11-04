'use strict';

const BaseException = require(`${global.__basepath}/src/Exceptions/BaseException`);

class UnAuthorizedException extends BaseException{
    constructor(message, options = {}) {
        super(message);
        console.log(`Logged Response: UnAuthorizedException`);

        for (const [key, value] of Object.entries(options)) {
            this[key] = value;
        }
    }

    get code() {
        return 403;
    }
}

module.exports = UnAuthorizedException;