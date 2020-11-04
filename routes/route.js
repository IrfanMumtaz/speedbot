"use strict";
const router = require('express').Router();

const LighthouseController = require(`${global.__basepath}/src/Http/Controllers/LightHouseController`);

router.get("/", LighthouseController.get);
router.post("/pagespeed", LighthouseController.store);

module.exports = router