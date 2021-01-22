"use strict";
const fs = require("fs");
const underscore = require("underscore");
const path = require("path");
const ModelException = require(`${global.__basepath}/src/Exceptions/ModelException`);

class FileHelper {
    static filesInFolder(directory) {
        let files = [];
        try {
            files = fs.readdirSync(directory, "utf8");
        } catch (err) {
            console.log(err);
        } finally {
            return files;
        }
    }

    static getLatestFileName(directory, fileNames = null, ext = "json") {
        fileNames = fileNames ? fileNames : FileHelper.filesInFolder(directory);
        try {
            return underscore.max(fileNames, function (f) {
                var fullpath = path.join(directory, f);
                return (
                    fullpath.indexOf(ext) >= 0 && fs.statSync(fullpath).ctime
                );
            });
        } catch (err) {
            console.log(err);
        }
    }

    static readFile(directory, filename) {
        const filePath = `${directory}/${filename}`;
        if (!fs.existsSync(filePath)) {
            throw ModelException.notFound();
        }
        try {
            return fs.readFileSync(filePath, "utf8", (err, results) => {
                console.log(err);
                return results;
            });
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = FileHelper;
