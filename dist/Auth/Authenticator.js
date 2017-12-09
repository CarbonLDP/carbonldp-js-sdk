"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Errors = require("../Errors");
var HTTP = require("../HTTP");
var Class = (function () {
    function Class() {
    }
    Class.prototype.isAuthenticated = function () {
        return !!this.credentials;
    };
    Class.prototype.clearAuthentication = function () {
        this.credentials = null;
    };
    Class.prototype.addAuthentication = function (requestOptions) {
        if (!this.isAuthenticated())
            throw new Errors.IllegalStateError("The authenticator isn't authenticated.");
        var headers = requestOptions.headers ?
            requestOptions.headers : requestOptions.headers = new Map();
        if (headers.has("authorization"))
            return requestOptions;
        var header = new HTTP.Header.Class();
        headers.set("authorization", header);
        header.values.push(this.getHeaderValue());
        return requestOptions;
    };
    return Class;
}());
exports.Class = Class;
exports.default = Class;

//# sourceMappingURL=Authenticator.js.map
