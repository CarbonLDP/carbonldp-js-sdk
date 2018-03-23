"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var ClientErrors = require("./ClientErrors");
var ServerErrors = require("./ServerErrors");
__export(require("./ClientErrors"));
__export(require("./ServerErrors"));
__export(require("./HTTPError"));
__export(require("./UnknownError"));
exports.statusCodeMap = new Map();
var addErrors = function (o) { return Object
    .keys(o)
    .map(function (k) { return o[k]; })
    .forEach(function (e) { return exports.statusCodeMap.set(e.statusCode, e); }); };
addErrors(ClientErrors);
addErrors(ServerErrors);

//# sourceMappingURL=index.js.map
