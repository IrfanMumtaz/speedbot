'use strict';

const AuthorizationException = require(`${global.__basepath}/src/Exceptions/AuthorizationException`);

const AuthMiddleware = (req, res, next) => {
    console.log(`Logged Request: ${req.url}  ${req.method} -- ${new Date()}`);

    if(req.headers['authorization'] !== process.env.token){
        throw AuthorizationException.unAuthorizedUser();
    }

    next();
    console.log(`Logged Response: ${res.statusCode}   ${res.statusMessage}`);
}

module.exports = AuthMiddleware;