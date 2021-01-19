"use strict";

const LighthouseWrapper = require(`${global.__basepath}/src/Http/Wrappers/LighthouseWrapper`);

exports.store = async (req, res) => {
    const lighthouseWrapper = new LighthouseWrapper();
    const data = await lighthouseWrapper.launchChromeAndRunLighthouse(req.body);
    res.json({ data });
};

exports.index = async (req, res) => {
    res.json({ result: "success" });
};

exports.show = async (req, res) => {
    try {
        const lighthouseWrapper = new LighthouseWrapper();
        const { url, userId } = req.params;
        const data = await lighthouseWrapper.readReport(userId, url);
        res.json({ data });
    } catch (error) {
        res.status(error.code).json({ result: error.message });
    }
};
