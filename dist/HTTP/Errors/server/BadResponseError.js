"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var HTTPError_1 = require("./../HTTPError");
var name = "BadResponseError";
var statusCode = 0;
var Class = (function (_super) {
    __extends(Class, _super);
    function Class() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(Class, "statusCode", {
        get: function () { return statusCode; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Class.prototype, "name", {
        get: function () { return name; },
        enumerable: true,
        configurable: true
    });
    return Class;
}(HTTPError_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Class;

//# sourceMappingURL=BadResponseError.js.map
