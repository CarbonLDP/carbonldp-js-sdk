"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Errors_1 = require("../Errors");
var Header_1 = require("../HTTP/Header");
var Authenticator = (function () {
    function Authenticator() {
    }
    Authenticator.prototype.isAuthenticated = function () {
        return !!this.credentials;
    };
    Authenticator.prototype.clearAuthentication = function () {
        this.credentials = null;
    };
    Authenticator.prototype.addAuthentication = function (requestOptions) {
        if (!this.isAuthenticated())
            throw new Errors_1.IllegalStateError("The authenticator isn't authenticated.");
        var headers = requestOptions.headers ?
            requestOptions.headers : requestOptions.headers = new Map();
        if (headers.has("authorization"))
            return requestOptions;
        var strAuthHeader = this.getHeaderValue();
        headers.set("authorization", new Header_1.Header([strAuthHeader]));
        return requestOptions;
    };
    return Authenticator;
}());
exports.Authenticator = Authenticator;

//# sourceMappingURL=Authenticator.js.map
