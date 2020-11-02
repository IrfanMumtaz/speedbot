"use strict";
module.exports = function (app) {
    const LighthouseController = require("./Controllers/LightHouseController");

    app.route("/report/").post(LighthouseController.store);
};
