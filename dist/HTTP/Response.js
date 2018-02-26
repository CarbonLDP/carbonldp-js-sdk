"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Utils_1 = require("../Utils");
var Header_1 = require("./Header");
var Class = (function () {
    function Class(request, data, response) {
        if (response === void 0) { response = {}; }
        if (typeof XMLHttpRequest !== "undefined" && request instanceof XMLHttpRequest) {
            var res = request;
            this.status = res.status;
            this.data = res.responseText;
            this.setHeaders(res.getAllResponseHeaders());
        }
        else {
            this.status = response.statusCode;
            this.data = data || "";
            this.setHeaders(response.headers);
        }
        this.request = request;
    }
    Class.prototype.getHeader = function (name) {
        name = name.toLowerCase();
        return this.headers.get(name) || null;
    };
    Class.prototype.setHeaders = function (headers) {
        if (Utils_1.isString(headers)) {
            this.headers = Header_1.Header.parseHeaders(headers);
        }
        else {
            this.headers = new Map();
            if (Utils_1.isObject(headers)) {
                for (var _i = 0, _a = Object.keys(headers); _i < _a.length; _i++) {
                    var name_1 = _a[_i];
                    this.headers.set(name_1.toLowerCase(), new Header_1.Header(headers[name_1]));
                }
            }
        }
    };
    return Class;
}());
exports.Class = Class;
var Util = (function () {
    function Util() {
    }
    Util.getETag = function (response) {
        if (!response || !response.headers)
            return null;
        var etagHeader = response.getHeader("ETag");
        if (!etagHeader)
            return null;
        if (!etagHeader.values.length)
            return null;
        if (etagHeader.values.length > 1)
            console.warn("The response contains more than one ETag. Response: %o", response);
        return etagHeader.values[0].toString();
    };
    return Util;
}());
exports.Util = Util;
exports.default = Class;

//# sourceMappingURL=Response.js.map
