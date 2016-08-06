"use strict";
var Auth = require("./Auth");
exports.defaultSettings = {
    "domain": "carbonldp.com",
    "http.ssl": true,
    "auth.method": Auth.Method.TOKEN,
    "platform.container": "platform/",
    "platform.apps.container": "apps/",
    "platform.agents.container": "agents/",
    "platform.roles.container": "roles/",
    "vocabulary": "vocabulary/#",
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = exports.defaultSettings;

//# sourceMappingURL=Settings.js.map
