"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UsernameAndPasswordToken = (function () {
    function UsernameAndPasswordToken(username, password) {
        this._username = username;
        this._password = password;
    }
    Object.defineProperty(UsernameAndPasswordToken.prototype, "username", {
        get: function () { return this._username; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UsernameAndPasswordToken.prototype, "password", {
        get: function () { return this._password; },
        enumerable: true,
        configurable: true
    });
    return UsernameAndPasswordToken;
}());
exports.UsernameAndPasswordToken = UsernameAndPasswordToken;

//# sourceMappingURL=BasicToken.js.map
