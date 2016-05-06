"use strict";
var Method;
(function (Method) {
    Method[Method["OPTIONS"] = 0] = "OPTIONS";
    Method[Method["HEAD"] = 1] = "HEAD";
    Method[Method["GET"] = 2] = "GET";
    Method[Method["POST"] = 3] = "POST";
    Method[Method["PUT"] = 4] = "PUT";
    Method[Method["PATCH"] = 5] = "PATCH";
    Method[Method["DELETE"] = 6] = "DELETE";
})(Method || (Method = {}));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Method;
