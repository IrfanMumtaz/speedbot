"use strict";

const LighthouseWrapper = require("../Wrappers/LightouseWrapper.js")

exports.generate = function (req, res) {
    const lighthouseWrapper = new LighthouseWrapper();
    const result = lighthouseWrapper.launchChromeAndRunLighthouse(req.body.url)
    res.json({ result: result });
};

// exports.create_a_task = function (req, res) {
//     var new_task = new Task(req.body);
//     new_task.save(function (err, task) {
//         if (err) res.send(err);
//         res.json(task);
//     });
// };

// exports.read_a_task = function (req, res) {
//     Task.findById(req.params.taskId, function (err, task) {
//         if (err) res.send(err);
//         res.json(task);
//     });
// };

// exports.update_a_task = function (req, res) {
//     Task.findOneAndUpdate(
//         { _id: req.params.taskId },
//         req.body,
//         { new: true },
//         function (err, task) {
//             if (err) res.send(err);
//             res.json(task);
//         }
//     );
// };

// exports.delete_a_task = function (req, res) {
//     Task.remove(
//         {
//             _id: req.params.taskId,
//         },
//         function (err, task) {
//             if (err) res.send(err);
//             res.json({ message: "Task successfully deleted" });
//         }
//     );
// };
