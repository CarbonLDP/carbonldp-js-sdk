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
var Errors_1 = require("../Errors");
var Utils_1 = require("../Utils");
var AbstractAuthenticator_1 = require("./AbstractAuthenticator");
var BasicCredentials_1 = require("./BasicCredentials");
var BasicAuthenticator = (function (_super) {
    __extends(BasicAuthenticator, _super);
    function BasicAuthenticator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BasicAuthenticator.prototype.authenticate = function (authenticationToken) {
        var _this = this;
        return Utils_1.promiseMethod(function () {
            if (!authenticationToken)
                throw new Errors_1.IllegalArgumentError("The authenticationToken cannot be empty.");
            if (!authenticationToken.username)
                throw new Errors_1.IllegalArgumentError("The username cannot be empty.");
            if (!authenticationToken.password)
                throw new Errors_1.IllegalArgumentError("The password cannot be empty.");
            _this._credentials = new BasicCredentials_1.BasicCredentials(authenticationToken.username, authenticationToken.password);
            return _this._credentials;
        });
    };
    BasicAuthenticator.prototype._getHeaderValue = function () {
        return "Basic " + toB64(this._credentials.username + ":" + this._credentials.password);
    };
    return BasicAuthenticator;
}(AbstractAuthenticator_1.AbstractAuthenticator));
exports.BasicAuthenticator = BasicAuthenticator;
function toB64(str) {
    return (typeof btoa !== "undefined") ? btoa(str) : new Buffer(str).toString("base64");
}

//# sourceMappingURL=BasicAuthenticator.js.map
