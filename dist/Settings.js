"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Auth = require("./Auth");
exports.defaultSettings = {
    "auth.method": Auth.Method.TOKEN,
    "system.container": ".system/",
    "system.platform.metadata": "platform/",
    "system.instance.metadata": "instance/",
    "system.agents.container": "agents/",
    "system.roles.container": "roles/",
    "vocabulary": "vocabulary/#",
};
exports.default = exports.defaultSettings;

//# sourceMappingURL=Settings.js.map
