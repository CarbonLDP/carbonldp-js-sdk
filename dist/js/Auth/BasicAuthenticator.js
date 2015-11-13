var HTTP = require("./../HTTP");
var Errors = require("./../Errors");
var Class = (function () {
    function Class() {
    }
    Class.prototype.isAuthenticated = function () {
        return this.credentials !== null;
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
            // TODO: Check that the username and password are correct
            _this.credentials = {
                username: authenticationToken.username,
                password: authenticationToken.password
            };
            resolve();
        });
    };
    Class.prototype.addAuthentication = function (requestOptions) {
        var headers = requestOptions.headers ? requestOptions.headers : requestOptions.headers = new Map();
        this.addBasicAuthenticationHeader(headers);
        return requestOptions;
    };
    Class.prototype.clearAuthentication = function () {
        this.credentials = null;
    };
    Class.prototype.addBasicAuthenticationHeader = function (headers) {
        var header;
        if (headers.has("Authorization")) {
            header = headers.get("Authorization");
        }
        else {
            header = new HTTP.Header.Class();
            headers.set("Authorization", header);
        }
        var authorization = "BASIC " + btoa(this.credentials.username + ":" + this.credentials.password);
        header.values.push(new HTTP.Header.Value(authorization));
        return headers;
    };
    return Class;
})();
exports.Class = Class;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Class;

//# sourceMappingURL=BasicAuthenticator.js.map
