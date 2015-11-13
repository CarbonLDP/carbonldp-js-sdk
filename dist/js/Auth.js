var BasicAuthenticator_1 = require("./Auth/BasicAuthenticator");
var TokenAuthenticator_1 = require("./Auth/TokenAuthenticator");
var UsernameAndPasswordToken_1 = require("./Auth/UsernameAndPasswordToken");
var Errors = require("./Errors");
(function (Method) {
    Method[Method["BASIC"] = 0] = "BASIC";
    Method[Method["TOKEN"] = 1] = "TOKEN";
})(exports.Method || (exports.Method = {}));
var Method = exports.Method;
var Class = (function () {
    function Class(parent) {
        this.method = null;
        this.parent = parent;
        this.authenticators = new Map();
        this.authenticators.set(Method.BASIC, new BasicAuthenticator_1.default());
        this.authenticators.set(Method.TOKEN, new TokenAuthenticator_1.default(this.parent));
    }
    Class.prototype.isAuthenticated = function (askParent) {
        if (askParent === void 0) { askParent = true; }
        var authenticated = false;
        // TODO
        return (authenticated ||
            (askParent && !!this.parent.parent && this.parent.parent.Auth.isAuthenticated()));
    };
    Class.prototype.login = function (username, password) {
        var authenticationToken = new UsernameAndPasswordToken_1.default(username, password);
        var method = this.parent.getSetting("auth.method");
        var authenticator = this.authenticators.get(method);
        if (authenticator === null)
            return new Promise(function () {
                throw new Errors.IllegalStateError("The authentication method specified isn\'t supported.");
            });
        return authenticator.authenticate(authenticationToken);
    };
    Class.prototype.addAuthentication = function (requestOptions) {
        if (!this.isAuthenticated(false)) {
            if (this.parent.parent) {
                this.parent.parent.Auth.addAuthentication(requestOptions);
                return;
            }
            else {
                console.warn("There is no authentication to add to the request.");
            }
        }
        // TODO
    };
    return Class;
})();
exports.Class = Class;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Class;

//# sourceMappingURL=Auth.js.map
