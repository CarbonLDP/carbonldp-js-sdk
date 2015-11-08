/// <reference path="../typings/es6-promise/es6-promise.d.ts" />
var HTTP = require('./HTTP');
var Errors = require('./Errors');
var Method;
(function (Method) {
    Method[Method["Basic"] = 0] = "Basic";
})(Method || (Method = {}));
exports.Method = Method;
var Auth = (function () {
    function Auth(parent) {
        this.authenticated = false;
        this.method = null;
        this.parent = parent;
    }
    Auth.prototype.isAuthenticated = function (askParent) {
        if (askParent === void 0) { askParent = true; }
        //@formatter:off
        return (this.authenticated ||
            (askParent && !!this.parent.parent && this.parent.parent.Auth.isAuthenticated()));
        //@formatter:on
    };
    Auth.prototype.login = function (username, password) {
        var method = this.parent.getSetting("auth.method");
        switch (method) {
            case Method.Basic:
                return this.basicAuthentication(username, password);
            default:
                return new Promise(function () {
                    throw new Errors.IllegalStateError('The authentication method specified isn\'t supported.');
                });
        }
    };
    Auth.prototype.addAuthentication = function (requestOptions) {
        if (!this.isAuthenticated(false)) {
            if (this.parent.parent) {
                this.parent.parent.Auth.addAuthentication(requestOptions);
                return;
            }
            else {
                console.warn("There is no authentication to add to the request.");
            }
        }
        var headers = requestOptions.headers ? requestOptions.headers : requestOptions.headers = new Map();
        switch (this.method) {
            case Method.Basic:
                this.addBasicAuthHeader(headers);
                requestOptions.sendCredentialsOnCORS = true;
                break;
        }
    };
    Auth.prototype.basicAuthentication = function (username, password) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            // TODO: Check that the credentials are valid
            _this.credentials = {
                username: username,
                password: password
            };
            _this.method = Method.Basic;
            _this.authenticated = true;
            resolve();
        });
    };
    Auth.prototype.addBasicAuthHeader = function (headers) {
        var header;
        if (headers.has('Authorization'))
            header = headers.get('Authorization');
        else {
            header = new HTTP.Header.Class();
            headers.set('Authorization', header);
        }
        var authorization = 'Basic ' + btoa(this.credentials.username + ':' + this.credentials.password);
        header.values.push(new HTTP.Header.Value(authorization));
    };
    return Auth;
})();
exports.Class = Auth;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Auth;
//@formatter:on 

//# sourceMappingURL=Auth.js.map
