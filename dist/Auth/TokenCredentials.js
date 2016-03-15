"use strict";
var Class = (function () {
    function Class(token) {
        this._token = token;
    }
    Object.defineProperty(Class.prototype, "token", {
        get: function () { return this._token; },
        enumerable: true,
        configurable: true
    });
    ;
    return Class;
}());
exports.Class = Class;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Class;

//# sourceMappingURL=TokenCredentials.js.map
