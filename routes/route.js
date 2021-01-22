"use strict";
const router = require("express").Router();

const LighthouseController = require(`${global.__basepath}/src/Http/Controllers/LightHouseController`);

router.get("/", LighthouseController.index);
router.post("/pagespeed", LighthouseController.store);
router.get("/pagespeed/:userId/:dir", LighthouseController.show);
router.get("/pagespeed/result/:userId/:dir", LighthouseController.result);

module.exports = router;
