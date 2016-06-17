"use strict";
var BasicAuthenticator_1 = require("./Auth/BasicAuthenticator");
exports.BasicAuthenticator = BasicAuthenticator_1.default;
var TokenAuthenticator_1 = require("./Auth/TokenAuthenticator");
exports.TokenAuthenticator = TokenAuthenticator_1.default;
var Token = require("./Auth/Token");
exports.Token = Token;
var UsernameAndPasswordToken_1 = require("./Auth/UsernameAndPasswordToken");
exports.UsernameAndPasswordToken = UsernameAndPasswordToken_1.default;
var Errors = require("./Errors");
var Utils = require("./Utils");
(function (Method) {
    Method[Method["BASIC"] = 0] = "BASIC";
    Method[Method["TOKEN"] = 1] = "TOKEN";
})(exports.Method || (exports.Method = {}));
var Method = exports.Method;
var Class = (function () {
    function Class(context) {
        this.context = context;
        this.authenticators = [];
        this.authenticators[Method.BASIC] = new BasicAuthenticator_1.default();
        this.authenticators[Method.TOKEN] = new TokenAuthenticator_1.default(this.context);
    }
    Class.prototype.isAuthenticated = function (askParent) {
        if (askParent === void 0) { askParent = true; }
        return ((this.authenticator && this.authenticator.isAuthenticated()) ||
            (askParent && !!this.context.parentContext && this.context.parentContext.auth.isAuthenticated()));
    };
    Class.prototype.authenticate = function (username, password) {
        return this.authenticateUsing("TOKEN", username, password);
    };
    Class.prototype.authenticateUsing = function (method, userOrTokenOrCredentials, password) {
        switch (method) {
            case "BASIC":
                return this.authenticateWithBasic(userOrTokenOrCredentials, password);
            case "TOKEN":
                return this.authenticateWithToken(userOrTokenOrCredentials, password);
            default:
                return Promise.reject(new Errors.IllegalArgumentError("No exists the authentication method '" + method + "'"));
        }
    };
    Class.prototype.addAuthentication = function (requestOptions) {
        if (this.isAuthenticated(false)) {
            this.authenticator.addAuthentication(requestOptions);
        }
        else if (!!this.context.parentContext) {
            this.context.parentContext.auth.addAuthentication(requestOptions);
        }
        else {
            console.warn("There is no authentication to add to the request.");
        }
    };
    Class.prototype.clearAuthentication = function () {
        if (!this.authenticator)
            return;
        this.authenticator.clearAuthentication();
        this.authenticator = null;
    };
    Class.prototype.authenticateWithBasic = function (username, password) {
        var authenticator = this.authenticators[Method.BASIC];
        var authenticationToken;
        authenticationToken = new UsernameAndPasswordToken_1.default(username, password);
        this.clearAuthentication();
        this.authenticator = authenticator;
        return this.authenticator.authenticate(authenticationToken);
    };
    Class.prototype.authenticateWithToken = function (userOrTokenOrCredentials, password) {
        var authenticator = this.authenticators[Method.TOKEN];
        var credentials = null;
        var authenticationToken = null;
        if (Utils.isString(userOrTokenOrCredentials) && Utils.isString(password)) {
            authenticationToken = new UsernameAndPasswordToken_1.default(userOrTokenOrCredentials, password);
        }
        else if (Token.Factory.is(userOrTokenOrCredentials)) {
            credentials = userOrTokenOrCredentials;
        }
        else {
            return Promise.reject(new Errors.IllegalArgumentError("Parameters do not match with the authentication request."));
        }
        this.clearAuthentication();
        this.authenticator = authenticator;
        if (authenticationToken)
            return authenticator.authenticate(authenticationToken);
        return authenticator.authenticate(credentials);
    };
    return Class;
}());
exports.Class = Class;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Class;

//# sourceMappingURL=Auth.js.map
