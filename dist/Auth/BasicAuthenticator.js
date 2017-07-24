"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Errors = require("./../Errors");
var HTTP = require("./../HTTP");
var UsernameAndPasswordCredentials = require("./UsernameAndPasswordCredentials");
var Class = (function () {
    function Class() {
    }
    Class.prototype.isAuthenticated = function () {
        return !!this.credentials;
    };
    Class.prototype.authenticate = function (authenticationToken) {
        var _this = this;
        if (authenticationToken === null)
            throw new Errors.IllegalArgumentError("The authenticationToken cannot be null.");
        return new Promise(function (resolve, reject) {
            if (!authenticationToken.username)
                throw new Errors.IllegalArgumentError("The username cannot be empty.");
            if (!authenticationToken.password)
                throw new Errors.IllegalArgumentError("The password cannot be empty.");
            _this.credentials = new UsernameAndPasswordCredentials.Class(authenticationToken.username, authenticationToken.password);
            resolve(_this.credentials);
        });
    };
    Class.prototype.addAuthentication = function (requestOptions) {
        if (!this.isAuthenticated())
            throw new Errors.IllegalStateError("The authenticator isn't authenticated.");
        var headers = requestOptions.headers ? requestOptions.headers : requestOptions.headers = new Map();
        this.addBasicAuthenticationHeader(headers);
        return requestOptions;
    };
    Class.prototype.clearAuthentication = function () {
        this.credentials = null;
    };
    Class.prototype.addBasicAuthenticationHeader = function (headers) {
        if (headers.has("authorization"))
            return;
        var header = new HTTP.Header.Class();
        headers.set("authorization", header);
        var authorization = "Basic " + toB64(this.credentials.username + ":" + this.credentials.password);
        header.values.push(new HTTP.Header.Value(authorization));
    };
    return Class;
}());
exports.Class = Class;
function toB64(str) {
    return (typeof btoa !== "undefined") ? btoa(str) : new Buffer(str).toString("base64");
}
exports.default = Class;

//# sourceMappingURL=BasicAuthenticator.js.map
