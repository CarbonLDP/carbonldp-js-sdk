"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
}
Object.defineProperty(exports, "__esModule", { value: true });
var Errors = __importStar(require("../Errors"));
var Utils = __importStar(require("../Utils"));
var AuthMethod_1 = require("./AuthMethod");
var BasicAuthenticator_1 = require("./BasicAuthenticator");
var Roles = __importStar(require("./Roles"));
var TokenAuthenticator_1 = require("./TokenAuthenticator");
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
            _a[AuthMethod_1.AuthMethod.TOKEN] = new TokenAuthenticator_1.TokenAuthenticator(this.context),
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
        var _this = this;
        this.clearAuthentication();
        var authenticator = this.authenticators[method];
        if (!authenticator)
            return Promise.reject(new Errors.IllegalArgumentError("Invalid authentication method \"" + method + "\"."));
        var authenticationToken;
        if (Utils.isString(userOrCredentials))
            authenticationToken = new UsernameAndPasswordToken_1.UsernameAndPasswordToken(userOrCredentials, password);
        else if (TokenCredentials.Factory.hasClassProperties(userOrCredentials)) {
            authenticationToken = userOrCredentials;
        }
        else {
            return Promise.reject(new Errors.IllegalArgumentError("Invalid authentication token."));
        }
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
    return AuthService;
}());
exports.AuthService = AuthService;

//# sourceMappingURL=Service.js.map
