"use strict";
const lighthouse = require("lighthouse");
const chromeLauncher = require("chrome-launcher");
const fs = require("fs");
const glob = require("glob");
const path = require("path");
const FileHelper = require(`${global.__basepath}/src/Helpers/FileHelper`);
const TimeStampHelper = require(`${global.__basepath}/src/Helpers/TimeStampHelper`);

class LighthouseWrapper {
    constructor() {
        this.path = "Reports";
    }

    run = async function (req) {
        const dir = this.makeDirectory(req.user_id, req.url);
        const name = TimeStampHelper.getCurrentTimeStamp();
        const chrome = await chromeLauncher.launch({
            chromeFlags: ["--headless"],
        });
        const options = {
            logLevel: "info",
            output: ["html", "json"],
            onlyCategories: ["performance"],
            port: chrome.port,
        };
        lighthouse(req.url, options).then((report) => {
            const reportHtml = report.report;
            const reportArray = reportHtml.toString().split("</html>");
            reportArray[1] = reportArray[1].replace(",{", "{");
            fs.writeFileSync(`${dir}/${name}.html`, reportArray[0]);
            fs.writeFileSync(`${dir}/${name}.json`, reportArray[1]);
            chrome.kill();
        });
    };

    makeDirectory = function (user_id, url) {
        const urlObj = new URL(url);
        let dirName = urlObj.host.replace("www.", "");
        if (urlObj.pathname !== "/") {
            dirName = dirName + urlObj.pathname.replace(/\//g, "_");
        }

        const dirPath = `${this.path}/${user_id}/${dirName}`;

        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }

        return dirPath;
    };

    syncPreviousReport = function () {
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
    };

    writeRerport = function (results, format) {
        const file = `${this.directory}/${this.name}.${format}`;
        fs.writeFileSync(file, results.report, (err) => {
            if (err) throw err;
        });

        return file;
    };

    readReport = function (userId, dir) {
        const directory = `${global.__basepath}/Reports/${userId}/${dir}`;
        const latestFile = FileHelper.getLatestFileName(
            directory,
            null,
            "json"
        );
        console.log(directory, latestFile);

        let output = FileHelper.readFile(directory, latestFile);
        output = JSON.parse(output);

        return {
            report: latestFile,
            performance: output.categories.performance.score * 100,
            first_contentful_paint:
                output.audits.metrics.details.items[0].firstContentfulPaint /
                1000,
            first_meaningful_paint:
                output.audits.metrics.details.items[0].firstMeaningfulPaint /
                1000,
            largest_contentful_paint:
                output.audits.metrics.details.items[0].largestContentfulPaint /
                1000,
            interactive_time:
                output.audits.metrics.details.items[0].interactive / 1000,
            speed_index:
                output.audits.metrics.details.items[0].speedIndex / 1000,
            total_blocking_time:
                output.audits.metrics.details.items[0].totalBlockingTime / 1000,
            cumulative_layout_shft:
                output.audits.metrics.details.items[0].cumulativeLayoutShift *
                1000,
            estimated_input_latency:
                output.audits.metrics.details.items[0].estimatedInputLatency,
            screenshot: output.audits["final-screenshot"].details.data,
            /* accessibility: output.categories.accessibility.score * 100,
            seo: output.categories.seo.score * 100,*/
        };
    };

    /* lighthouseReport = function (url, chrome) {
        const options = {
            port: chrome.port,
        };
        lighthouse(url, options).then((result) => {
            this.writeRerport(result, "html");
            this.writeRerport(result, "json");
            chrome.kill().then(() => result);
        });
    };

    launchChromeAndRunLighthouse = async function (req) {
        try {
            const chrome = await chromeLauncher.launch();

            //create directory
            this.directory = this.makeDirectory(req.user_id, req.url);

            //sync all previous report
            await this.syncPreviousReport(this.directory);

            //create filename
            this.name = TimeStampHelper.getCurrentTimeStamp();

            //get result
            this.lighthouseReport(req.url, chrome);

            return { filename: this.name };
        } catch (error) {
            console.log(error);
            return null;
        }
    }; */
}
module.exports = LighthouseWrapper;
