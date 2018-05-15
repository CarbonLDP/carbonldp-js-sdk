"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Errors_1 = require("../Errors");
var Utils = __importStar(require("../Utils"));
var AuthMethod_1 = require("./AuthMethod");
var BasicAuthenticator_1 = require("./BasicAuthenticator");
var BasicToken_1 = require("./BasicToken");
var TokenAuthenticator_1 = require("./TokenAuthenticator");
var TokenCredentials_1 = require("./TokenCredentials");
var UsersEndpoint_1 = require("./UsersEndpoint");
var AuthService = (function () {
    function AuthService(context) {
        this.context = context;
        var usersIRI = context._resolvePath("users");
        this.users = UsersEndpoint_1.UsersEndpoint
            .decorate(context.registry.getPointer(usersIRI));
        this.authenticators = (_a = {},
            _a[AuthMethod_1.AuthMethod.BASIC] = new BasicAuthenticator_1.BasicAuthenticator(this.context),
            _a[AuthMethod_1.AuthMethod.TOKEN] = new TokenAuthenticator_1.TokenAuthenticator(this.context),
            _a);
        var _a;
    }
    Object.defineProperty(AuthService.prototype, "authenticatedUser", {
        get: function () {
            if (this._authenticatedUser)
                return this._authenticatedUser;
            return null;
        },
        enumerable: true,
        configurable: true
    });
    AuthService.prototype.isAuthenticated = function () {
        if (!this.authenticator)
            return false;
        return this.authenticator.isAuthenticated();
    };
    AuthService.prototype.authenticate = function (username, password) {
        return this.authenticateUsing(AuthMethod_1.AuthMethod.TOKEN, username, password);
    };
    AuthService.prototype.authenticateUsing = function (method, userOrCredentials, password) {
        var _this = this;
        this.clearAuthentication();
        var authenticator = this.authenticators[method];
        if (!authenticator)
            return Promise.reject(new Errors_1.IllegalArgumentError("Invalid authentication method \"" + method + "\"."));
        var authenticationToken = this
            ._getAuthenticationToken(userOrCredentials, password);
        if (!authenticationToken)
            return Promise.reject(new Errors_1.IllegalArgumentError("Invalid authentication token."));
        var credentials;
        return authenticator
            .authenticate(authenticationToken)
            .then(function (_credentials) {
            credentials = _credentials;
            return authenticator
                .getAuthenticatedUser();
        }).then(function (persistedUser) {
            _this._authenticatedUser = persistedUser;
            _this.authenticator = authenticator;
            return credentials;
        });
    };
    AuthService.prototype.addAuthentication = function (requestOptions) {
        if (!this.isAuthenticated())
            return;
        return this.authenticator.addAuthentication(requestOptions);
    };
    AuthService.prototype.clearAuthentication = function () {
        if (!this.authenticator)
            return;
        this.authenticator.clearAuthentication();
        this.authenticator = null;
        this._authenticatedUser = null;
    };
    AuthService.prototype._getAuthenticationToken = function (userOrCredentials, password) {
        if (Utils.isString(userOrCredentials))
            return new BasicToken_1.BasicToken(userOrCredentials, password);
        if (TokenCredentials_1.TokenCredentialsBase.is(userOrCredentials))
            return userOrCredentials;
        return null;
    };
    return AuthService;
}());
exports.AuthService = AuthService;

//# sourceMappingURL=AuthService.js.map
