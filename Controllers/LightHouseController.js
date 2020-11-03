"use strict";

const LighthouseWrapper = require("../Wrappers/LightouseWrapper.js")

exports.store = async (req, res) => {
    const lighthouseWrapper = new LighthouseWrapper();
    lighthouseWrapper.launchChromeAndRunLighthouse(req.body.url)
    res.json( {result: "Success!"} );
};
