var BasicAuthenticator_1 = require("./Auth/BasicAuthenticator");
var TokenAuthenticator_1 = require("./Auth/TokenAuthenticator");
var UsernameAndPasswordToken_1 = require("./Auth/UsernameAndPasswordToken");
var Errors = require("./Errors");
var Utils = require("./Utils");
(function (Method) {
    Method[Method["BASIC"] = 0] = "BASIC";
    Method[Method["TOKEN"] = 1] = "TOKEN";
})(exports.Method || (exports.Method = {}));
var Method = exports.Method;
var Class = (function () {
    function Class(parent) {
        this.method = null;
        this.parent = parent;
        this.authenticators = [];
        this.authenticators.push(new TokenAuthenticator_1.default(this.parent));
        this.authenticators.push(new BasicAuthenticator_1.default());
    }
    Class.prototype.isAuthenticated = function (askParent) {
        if (askParent === void 0) { askParent = true; }
        return ((this.authenticator && this.authenticator.isAuthenticated()) ||
            (askParent && !!this.parent.parent && this.parent.parent.Auth.isAuthenticated()));
    };
    Class.prototype.authenticate = function (usernameOrToken, password) {
        var _this = this;
        if (password === void 0) { password = null; }
        return new Promise(function (resolve, reject) {
            if (!usernameOrToken)
                throw new Errors.IllegalArgumentError("Either a username or an authenticationToken are required.");
            var authenticationToken;
            if (Utils.isString(usernameOrToken)) {
                var username = usernameOrToken;
                if (!password)
                    throw new Errors.IllegalArgumentError("A password is required when providing a username.");
                authenticationToken = new UsernameAndPasswordToken_1.default(username, password);
            }
            else {
                authenticationToken = usernameOrToken;
            }
            if (_this.authenticator)
                _this.clearAuthentication();
            _this.authenticator = _this.getAuthenticator(authenticationToken);
            resolve(_this.authenticator.authenticate(authenticationToken));
        });
    };
    Class.prototype.addAuthentication = function (requestOptions) {
        if (this.isAuthenticated(false)) {
            this.authenticator.addAuthentication(requestOptions);
        }
        else if ("parent" in this.parent) {
            this.parent.parent.Auth.addAuthentication(requestOptions);
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
    Class.prototype.getAuthenticator = function (authenticationToken) {
        for (var _i = 0, _a = this.authenticators; _i < _a.length; _i++) {
            var authenticator = _a[_i];
            if (authenticator.supports(authenticationToken))
                return authenticator;
        }
        throw new Errors.IllegalStateError("The configured authentication method isn\'t supported.");
    };
    return Class;
})();
exports.Class = Class;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Class;

//# sourceMappingURL=Auth.js.map
