"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
}
Object.defineProperty(exports, "__esModule", { value: true });
var ClientErrors = __importStar(require("./ClientErrors"));
var HTTPError_1 = require("./HTTPError");
exports.HTTPError = HTTPError_1.HTTPError;
var ServerErrors = __importStar(require("./ServerErrors"));
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
