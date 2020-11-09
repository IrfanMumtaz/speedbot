"use strict";

const LighthouseWrapper = require(`${global.__basepath}/src/Http/Wrappers/LighthouseWrapper`)

exports.store = async (req, res) => {
    const lighthouseWrapper = new LighthouseWrapper();
    const data = await lighthouseWrapper.launchChromeAndRunLighthouse(req.body.url)
    res.json( {data} );
};

exports.index = async (req, res) => {
    res.json({result: "success"})
}

exports.show = async (req, res) => {
    const lighthouseWrapper = new LighthouseWrapper();
    const {directory, filename} = req.params;
    const data = await lighthouseWrapper.readReport(directory, filename);
    res.json( {data} );
}