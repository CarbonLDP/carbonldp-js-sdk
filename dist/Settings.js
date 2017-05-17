"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Auth = require("./Auth");
exports.defaultSettings = {
    "auth.method": Auth.Method.TOKEN,
    "system.container": ".system/",
    "system.platform.metadata": "platform/",
    "system.instance.metadata": "instance/",
    "system.users.container": "users/",
    "system.credentials.container": "credentials/",
    "system.roles.container": "roles/",
    "vocabulary": "vocabulary/#",
};
exports.default = exports.defaultSettings;

//# sourceMappingURL=Settings.js.map
