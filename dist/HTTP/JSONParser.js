"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var JSONParser = (function () {
    function JSONParser() {
    }
    JSONParser.prototype.parse = function (body) {
        return new Promise(function (resolve) { return resolve(JSON.parse(body)); });
    };
    return JSONParser;
}());
exports.JSONParser = JSONParser;
exports.default = JSONParser;

//# sourceMappingURL=JSONParser.js.map
