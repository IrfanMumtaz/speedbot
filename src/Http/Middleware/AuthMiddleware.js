'use strict';

const UnAuthorizedException = require(`${global.__basepath}/src/Exceptions/UnAuthorizedException`);

const AuthMiddleware = (req, res, next) => {
    console.log(`Logged  ${req.url}  ${req.method} -- ${new Date()}`);
    if(req.headers['authorization'] === 'abcd1234'){
        next();
    }
    throw new UnAuthorizedException('You are not authorized');
}

module.exports = AuthMiddleware;