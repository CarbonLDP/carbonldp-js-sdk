"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BasicToken = (function () {
    function BasicToken(username, password) {
        this._username = username;
        this._password = password;
    }
    Object.defineProperty(BasicToken.prototype, "username", {
        get: function () { return this._username; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BasicToken.prototype, "password", {
        get: function () { return this._password; },
        enumerable: true,
        configurable: true
    });
    return BasicToken;
}());
exports.BasicToken = BasicToken;

//# sourceMappingURL=BasicToken.js.map
