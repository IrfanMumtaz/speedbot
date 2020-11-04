"use strict";
const lighthouse = require("lighthouse");
const chromeLauncher = require("chrome-launcher");
const fs = require("fs");
const glob = require("glob");
const path = require("path");

module.exports = function() {

    this.path = 'Reports'

    this.makeDirectory = function(url){
        const urlObj = new URL(url);
        let dirName = urlObj.host.replace("www.", "");
        if (urlObj.pathname !== "/") {
            dirName = dirName + urlObj.pathname.replace(/\//g, "_");
        }

        const dirPath = `${this.path}/${dirName}`;
        
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }

        return dirPath;
    }

    this.syncPreviousReport = function(directory){
        const prevReports = glob(`${directory}/*.json`, {
            sync: true,
        });
        if (prevReports.length) {
            const dates = [];
            for (let report in prevReports) {
                dates.push(
                    new Date(
                        path.parse(prevReports[report]).name.replace(/_/g, ":")
                    )
                );
            }
        }
    }

    this.writeRerport = function(directory, results){
        const file = `${directory}/${results.lhr["fetchTime"].replace(/:/g, "_")}.json`;
        fs.writeFileSync(
            file,
            results.report,
            (err) => {
                if (err) throw err;
            }
        );

        return file;
    }

    this.readReport = function (pathStr) {
        const output = fs.readFileSync(pathStr, "utf8", (err, results) => {
            return results;
        });
        return JSON.parse(output);
    };


    this.launchChromeAndRunLighthouse = async function(url){

        try {
            const chrome = await chromeLauncher.launch();

            //create directory
            const directory = this.makeDirectory(url);

            //sync all previous report
            await this.syncPreviousReport(directory);

            //get result
            const results = await lighthouse(url, {port: chrome.port});
            //kill chrome
            await chrome.kill();

            //write report in file
            await this.writeRerport(directory, results);

            return results.lhr;
            
        } catch (error) {
            console.log(error);
            return null
        }
    }

}
