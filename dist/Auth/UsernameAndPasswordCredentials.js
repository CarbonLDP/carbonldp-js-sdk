"use strict";
var Class = (function () {
    function Class(username, password) {
        this._username = username;
        this._password = password;
    }
    Object.defineProperty(Class.prototype, "username", {
        get: function () { return this._username; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(Class.prototype, "password", {
        get: function () { return this._password; },
        enumerable: true,
        configurable: true
    });
    ;
    return Class;
}());
exports.Class = Class;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Class;

//# sourceMappingURL=UsernameAndPasswordCredentials.js.map
