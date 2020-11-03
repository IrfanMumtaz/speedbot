"use strict";
module.exports = (app) => {
    const LighthouseController = require("./Controllers/LightHouseController");

    app.route("/report/").post(LighthouseController.store);
};
