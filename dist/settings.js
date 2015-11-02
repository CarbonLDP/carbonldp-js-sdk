var Auth = require('./Auth');
var settings = {};
settings["domain"] = "carbonldp.com";
settings["http.ssl"] = true;
settings["auth.method"] = Auth.Method.Basic;
settings["platform.container"] = "platform/";
settings["platform.apps.container"] = settings["platform.container"] + "apps/";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = settings;
//# sourceMappingURL=settings.js.map