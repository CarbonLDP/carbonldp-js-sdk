"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
}
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
var Errors = __importStar(require("../Errors"));
var Utils = __importStar(require("../Utils"));
var AuthMethod_1 = require("./AuthMethod");
var BasicAuthenticator_1 = require("./BasicAuthenticator");
var PersistedUser = __importStar(require("./PersistedUser"));
var Roles = __importStar(require("./Roles"));
var TokenAuthenticator_1 = __importDefault(require("./TokenAuthenticator"));
var TokenCredentials = __importStar(require("./TokenCredentials"));
var UsernameAndPasswordToken_1 = require("./UsernameAndPasswordToken");
var Users = __importStar(require("./Users"));
var AuthService = (function () {
    function AuthService(context) {
        this.roles = new Roles.Class(this.context);
        this.users = new Users.Class(this.context);
        this.context = context;
        this.authenticators = (_a = {},
            _a[AuthMethod_1.AuthMethod.BASIC] = new BasicAuthenticator_1.BasicAuthenticator(this.context),
            _a[AuthMethod_1.AuthMethod.TOKEN] = new TokenAuthenticator_1.default(this.context),
            _a);
        var _a;
    }
    Object.defineProperty(AuthService.prototype, "authenticatedUser", {
        get: function () {
            if (this._authenticatedUser)
                return this._authenticatedUser;
            if (this.context.parentContext)
                return this.context.parentContext.auth.authenticatedUser;
            return null;
        },
        enumerable: true,
        configurable: true
    });
    AuthService.prototype.isAuthenticated = function (askParent) {
        if (askParent === void 0) { askParent = true; }
        return ((this.authenticator && this.authenticator.isAuthenticated()) ||
            (askParent && !!this.context.parentContext && !!this.context.parentContext.auth && this.context.parentContext.auth.isAuthenticated()));
    };
    AuthService.prototype.authenticate = function (username, password) {
        return this.authenticateUsing(AuthMethod_1.AuthMethod.TOKEN, username, password);
    };
    AuthService.prototype.authenticateUsing = function (method, userOrCredentials, password) {
        switch (method) {
            case AuthMethod_1.AuthMethod.BASIC:
                return this.authenticateWithBasic(userOrCredentials, password);
            case AuthMethod_1.AuthMethod.TOKEN:
                return this.authenticateWithToken(userOrCredentials, password);
            default:
                return Promise.reject(new Errors.IllegalArgumentError("No exists the authentication method '" + method + "'"));
        }
    };
    AuthService.prototype.addAuthentication = function (requestOptions) {
        if (this.isAuthenticated(false)) {
            this.authenticator.addAuthentication(requestOptions);
        }
        else if (!!this.context.parentContext && !!this.context.parentContext.auth) {
            this.context.parentContext.auth.addAuthentication(requestOptions);
        }
        else {
            console.warn("There is no authentication to add to the request.");
        }
    };
    AuthService.prototype.clearAuthentication = function () {
        if (!this.authenticator)
            return;
        this.authenticator.clearAuthentication();
        this.authenticator = null;
        this._authenticatedUser = null;
    };
    AuthService.prototype.authenticateWithBasic = function (username, password) {
        var _this = this;
        var authenticator = this.authenticators[AuthMethod_1.AuthMethod.BASIC];
        var authenticationToken = new UsernameAndPasswordToken_1.UsernameAndPasswordToken(username, password);
        this.clearAuthentication();
        var newCredentials;
        return authenticator.authenticate(authenticationToken).then(function (credentials) {
            newCredentials = credentials;
            return _this.getAuthenticatedUser(authenticator);
        }).then(function (persistedUser) {
            _this._authenticatedUser = persistedUser;
            _this.authenticator = authenticator;
            return newCredentials;
        });
    };
    AuthService.prototype.authenticateWithToken = function (userOrCredentials, password) {
        var _this = this;
        var authenticator = this.authenticators[AuthMethod_1.AuthMethod.TOKEN];
        var tokenOrCredentials = Utils.isString(userOrCredentials) ?
            new UsernameAndPasswordToken_1.UsernameAndPasswordToken(userOrCredentials, password) :
            TokenCredentials.Factory.hasClassProperties(userOrCredentials) ?
                userOrCredentials :
                new Errors.IllegalArgumentError("The token provided in not valid.");
        if (tokenOrCredentials instanceof Error)
            return Promise.reject(tokenOrCredentials);
        this.clearAuthentication();
        var newCredentials;
        return authenticator.authenticate(tokenOrCredentials).then(function (credentials) {
            newCredentials = credentials;
            if (PersistedUser.Factory.is(credentials.user))
                return credentials.user;
            return _this.getAuthenticatedUser(authenticator);
        }).then(function (persistedUser) {
            _this._authenticatedUser = persistedUser;
            _this.authenticator = authenticator;
            newCredentials.user = persistedUser;
            return newCredentials;
        });
    };
    AuthService.prototype.getAuthenticatedUser = function (authenticator) {
        var requestOptions = {};
        authenticator.addAuthentication(requestOptions);
        return Promise.resolve(null);
        return this.context.documents
            .get("users/me/", requestOptions)
            .then(function (_a) {
            var persistedUser = _a[0];
            return persistedUser;
        });
    };
    return AuthService;
}());
exports.AuthService = AuthService;

//# sourceMappingURL=Service.js.map
