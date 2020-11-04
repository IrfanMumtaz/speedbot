'use strict';

const UnAuthorizedException = require(`${global.__basepath}/src/Exceptions/UnAuthorizedException`);

const AuthMiddleware = (req, res, next) => {
    console.log(`Logged Request: ${req.url}  ${req.method} -- ${new Date()}`);

    if(req.headers['authorization'] !== process.env.token){
        throw new UnAuthorizedException('You are not authorized');
    }

    next();
    console.log(`Logged Response: ${res.statusCode}   ${res.statusMessage}`);
}

module.exports = AuthMiddleware;