"use strict";
const lighthouse = require("lighthouse");
const chromeLauncher = require("chrome-launcher");
const fs = require("fs");
const glob = require("glob");
const path = require("path");
const TimeStampHelper = require(`${global.__basepath}/src/Helpers/TimeStampHelper`);

module.exports = function() {

    this.path = 'Reports'
    this.directory = null;
    this.name = null;

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

    this.syncPreviousReport = function(){
        const prevReports = glob(`${this.directory}/*.json`, {
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

    this.writeRerport = function(results){
        const file = `${this.directory}/${this.name}.json`;
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

    this.lighthouseReport = function (url, chrome){
        lighthouse(url, {port: chrome.port}).then((result) =>{
            this.writeRerport(results);
            chrome.kill();
        });
    }


    this.launchChromeAndRunLighthouse = async function(url){

        try {
            const chrome = await chromeLauncher.launch();

            //create directory
            this.directory = this.makeDirectory(url);

            //sync all previous report
            await this.syncPreviousReport(this.directory);
            
            //create filename
            this.name = TimeStampHelper.getCurrentTimeStamp();

            //get result
            this.lighthouseReport(url, chrome);

            return this.name;
            
        } catch (error) {
            console.log(error);
            return null
        }
    }

}
