'use strict';

// Here is the base error classes to extend from

class BaseException extends Error {
    get name() {
        return this.constructor.name;
    }
}

module.exports = BaseException