"use strict";

const LighthouseWrapper = require(`${global.__basepath}/src/Http/Wrappers/LightouseWrapper`)

exports.store = async (req, res) => {
    const lighthouseWrapper = new LighthouseWrapper();
    const result = await lighthouseWrapper.launchChromeAndRunLighthouse(req.body.url)
    res.json( {result} );
};

exports.get = async (req, res) => {
    res.json({result: "success"})
}