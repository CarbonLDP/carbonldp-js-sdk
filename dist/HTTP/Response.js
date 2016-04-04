"use strict";
var Header = require("./Header");
var Class = (function () {
    function Class(request) {
        this.status = request.status;
        this.data = request.responseText;
        this.setHeaders(request);
        this.request = request;
    }
    Class.prototype.getHeader = function (name) {
        name = name.toLowerCase();
        return this.headers.get(name) || null;
    };
    Class.prototype.setHeaders = function (request) {
        var headersString = request.getAllResponseHeaders();
        if (headersString) {
            this.headers = Header.Util.parseHeaders(headersString);
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
