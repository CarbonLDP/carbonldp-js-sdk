"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var ClientErrors = require("./ClientErrors");
var HTTPError_1 = require("./HTTPError");
exports.HTTPError = HTTPError_1.HTTPError;
var ServerErrors = require("./ServerErrors");
var UnknownError_1 = require("./UnknownError");
exports.UnknownError = UnknownError_1.UnknownError;
__export(require("./ClientErrors"));
__export(require("./ServerErrors"));
var statusCodeMap = new Map();
exports.statusCodeMap = statusCodeMap;
var addErrors = function (o) { return Object
    .keys(o)
    .map(function (k) { return o[k]; })
    .forEach(function (e) { return statusCodeMap.set(e.statusCode, e); }); };
addErrors(ClientErrors);
addErrors(ServerErrors);

//# sourceMappingURL=index.js.map
