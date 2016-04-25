"use strict";
var Header = require("./Header");
var Utils_1 = require("../Utils");
var Class = (function () {
    function Class(request, data) {
        if (typeof XMLHttpRequest !== "undefined" && request instanceof XMLHttpRequest) {
            this.status = request.status;
            this.data = request.responseText;
            this.setHeaders(request.getAllResponseHeaders());
        }
        else {
            var response = request.res || {};
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
            this.headers = Header.Util.parseHeaders(headers);
        }
        else if (Utils_1.isObject(headers)) {
            this.headers = new Map();
            for (var _i = 0, _a = Object.keys(headers); _i < _a.length; _i++) {
                var name_1 = _a[_i];
                this.headers.set(name_1, new Header.Class(headers[name_1]));
            }
        }
        else {
            this.headers = new Map();
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Class;

//# sourceMappingURL=Response.js.map
