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
        fs.writeFile(
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


    this.launchChromeAndRunLighthouse =  function(url){
        

        return chromeLauncher.launch().then((chrome) => {
            const opts = {
                port: chrome.port,
            };
            return lighthouse(url, opts).then((results) => {

                //create directory
                const directory = this.makeDirectory(url);
                console.log(directory)
                
                //sync all previous report
                this.syncPreviousReport(directory)

                //write report in file
                this.writeRerport(directory, results);

                return chrome.kill().then(() => {
                    return {
                        json: "success",
                    };
                });
            });
        });
    }

}
