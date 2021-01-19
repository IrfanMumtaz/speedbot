"use strict";

const AuthorizationException = require(`${global.__basepath}/src/Exceptions/AuthorizationException`);

const AuthMiddleware = (req, res, next) => {
    console.log(`Logged Request: ${req.url}  ${req.method} -- ${new Date()}`);

    console.log(req.headers["token"]);
    if (req.headers["token"] !== process.env.TOKEN) {
        throw AuthorizationException.unAuthorizedUser();
    }

    next();
    console.log(`Logged Response: ${res.statusCode}   ${res.statusMessage}`);
};

module.exports = AuthMiddleware;
