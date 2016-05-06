"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var HTTPError_1 = require("./../HTTPError");
var name = "NotImplementedError";
var statusCode = 501;
var NotImplementedError = (function (_super) {
    __extends(NotImplementedError, _super);
    function NotImplementedError() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(NotImplementedError, "statusCode", {
        get: function () { return statusCode; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NotImplementedError.prototype, "name", {
        get: function () { return name; },
        enumerable: true,
        configurable: true
    });
    return NotImplementedError;
}(HTTPError_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = NotImplementedError;
