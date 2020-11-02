"use strict";

const LighthouseWrapper = require("../Wrappers/LightouseWrapper.js")

exports.store = async function (req, res) {
    const lighthouseWrapper = new LighthouseWrapper();
    const result = await lighthouseWrapper.launchChromeAndRunLighthouse(req.body.url)
    res.json({ result: result });
};

