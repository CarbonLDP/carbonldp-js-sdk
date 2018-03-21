"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BasicCredentials = (function () {
    function BasicCredentials(username, password) {
        this._username = username;
        this._password = password;
    }
    Object.defineProperty(BasicCredentials.prototype, "username", {
        get: function () { return this._username; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BasicCredentials.prototype, "password", {
        get: function () { return this._password; },
        enumerable: true,
        configurable: true
    });
    return BasicCredentials;
}());
exports.BasicCredentials = BasicCredentials;

//# sourceMappingURL=BasicCredentials.js.map
