'use strict';

class AuthorizationException{

    static unAuthorizedUser() {
        this.message = 'User is unauthorized';
        this.code = 403;
        
        console.log(`Logged Response: ${this.code}   ${this.message}`);
        return this;
    }
}

module.exports = AuthorizationException;