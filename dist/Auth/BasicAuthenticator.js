"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Utils_1 = require("../Utils");
var Errors = require("./../Errors");
var HTTP = require("./../HTTP");
var Authenticator_1 = require("./Authenticator");
var BasicCredentials = require("./BasicCredentials");
var Class = (function (_super) {
    __extends(Class, _super);
    function Class() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Class.prototype.authenticate = function (authenticationToken) {
        var _this = this;
        return Utils_1.promiseMethod(function () {
            if (authenticationToken === null)
                throw new Errors.IllegalArgumentError("The authenticationToken cannot be null.");
            if (!authenticationToken.username)
                throw new Errors.IllegalArgumentError("The username cannot be empty.");
            if (!authenticationToken.password)
                throw new Errors.IllegalArgumentError("The password cannot be empty.");
            _this.credentials = new BasicCredentials.Class(authenticationToken.username, authenticationToken.password);
            return _this.credentials;
        });
    };
    Class.prototype.getHeaderValue = function () {
        var authorization = "Basic " + toB64(this.credentials.username + ":" + this.credentials.password);
        return new HTTP.Header.Value(authorization);
    };
    return Class;
}(Authenticator_1.default));
exports.Class = Class;
function toB64(str) {
    return (typeof btoa !== "undefined") ? btoa(str) : new Buffer(str).toString("base64");
}
exports.default = Class;

//# sourceMappingURL=BasicAuthenticator.js.map
