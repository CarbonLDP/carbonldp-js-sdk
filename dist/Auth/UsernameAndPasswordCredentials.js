"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UsernameAndPasswordCredentials = (function () {
    function UsernameAndPasswordCredentials(username, password) {
        this._username = username;
        this._password = password;
    }
    Object.defineProperty(UsernameAndPasswordCredentials.prototype, "username", {
        get: function () { return this._username; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UsernameAndPasswordCredentials.prototype, "password", {
        get: function () { return this._password; },
        enumerable: true,
        configurable: true
    });
    return UsernameAndPasswordCredentials;
}());
exports.UsernameAndPasswordCredentials = UsernameAndPasswordCredentials;

//# sourceMappingURL=UsernameAndPasswordCredentials.js.map
