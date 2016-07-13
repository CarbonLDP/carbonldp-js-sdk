"use strict";
var Auth = require("./Auth");
var settings = {};
settings["domain"] = "carbonldp.com";
settings["http.ssl"] = true;
settings["auth.method"] = Auth.Method.TOKEN;
settings["platform.container"] = "platform/";
settings["platform.apps.container"] = "apps/";
settings["platform.agents.container"] = "agents/";
settings["platform.roles.container"] = "roles/";
settings["vocabulary"] = "vocabulary/#";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = settings;

//# sourceMappingURL=settings.js.map
