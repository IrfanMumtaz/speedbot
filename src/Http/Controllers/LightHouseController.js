"use strict";

const LighthouseWrapper = require(`${global.__basepath}/src/Http/Wrappers/LighthouseWrapper`);
const FileHelper = require(`${global.__basepath}/src/Helpers/FileHelper`);

exports.store = async (req, res) => {
    const lighthouseWrapper = new LighthouseWrapper();
    const data = await lighthouseWrapper.run(req.body);
    res.json({});
};

exports.index = async (req, res) => {
    res.json({ result: "success" });
};

exports.show = async (req, res) => {
    try {
        const lighthouseWrapper = new LighthouseWrapper();
        const { dir, userId } = req.params;
        const data = await lighthouseWrapper.readReport(userId, dir);
        res.json({ data });
    } catch (error) {
        console.log(error);
        res.status(error.code).json({ result: error.message });
    }
};

exports.result = async (req, res) => {
    try {
        const params = req.params;
        const directory = `${global.__basepath}/Reports/${params.userId}/${params.dir}`;
        const latestFile = FileHelper.getLatestFileName(
            directory,
            null,
            "html"
        );
        const path = `${directory}/${latestFile}`;
        res.sendFile(path);
    } catch (err) {
        console.log(err);
    }
};
