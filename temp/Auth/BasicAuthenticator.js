"use strict";
var HTTP = require("./../HTTP");
var Errors = require("./../Errors");
var UsernameAndPasswordToken_1 = require("./UsernameAndPasswordToken");
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
    Class.prototype.supports = function (authenticationToken) {
        return authenticationToken instanceof UsernameAndPasswordToken_1.default;
    };
    Class.prototype.addBasicAuthenticationHeader = function (headers) {
        var header;
        if (headers.has("authorization")) {
            header = headers.get("authorization");
        }
        else {
            header = new HTTP.Header.Class();
            headers.set("authorization", header);
        }
        var authorization = "Basic " + toB64(this.credentials.username + ":" + this.credentials.password);
        header.values.push(new HTTP.Header.Value(authorization));
        return headers;
    };
    return Class;
}());
exports.Class = Class;
function toB64(str) {
    return (typeof btoa !== "undefined") ? btoa(str) : new Buffer(str).toString("base64");
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Class;
