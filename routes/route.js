"use strict";
const router = require('express').Router();

const LighthouseController = require(`${global.__basepath}/src/Http/Controllers/LightHouseController`);

router.get("/", LighthouseController.index);
router.post("/pagespeed", LighthouseController.store);
router.get("/pagespeed/:directory/:filename", LighthouseController.show);

module.exports = router