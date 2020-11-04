"use strict";
const express = require("express"),
    app = express(),
    port = process.env.PORT || 3000,
    bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//define global variables
global.__basepath = process.cwd();

//middlewares
const AuthMiddleware = require(`${global.__basepath}/src/Http/Middleware/AuthMiddleware`);
app.use(AuthMiddleware)

//importing route
const router = require(`${global.__basepath}/routes/route`); 
app.use(router);

//Error Handler
const Handler = require(`${global.__basepath}/src/Exceptions/Handler`);
app.use(Handler);

//listening
app.listen(port);
console.log("RESTful API server started on: " + port);
