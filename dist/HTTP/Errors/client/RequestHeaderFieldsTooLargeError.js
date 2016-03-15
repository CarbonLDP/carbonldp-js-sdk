"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var HTTPError_1 = require("./../HTTPError");
var name = "RequestHeaderFieldsTooLargeError";
var statusCode = 431;
var RequestHeaderFieldsTooLargeError = (function (_super) {
    __extends(RequestHeaderFieldsTooLargeError, _super);
    function RequestHeaderFieldsTooLargeError() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(RequestHeaderFieldsTooLargeError, "statusCode", {
        get: function () { return statusCode; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RequestHeaderFieldsTooLargeError.prototype, "name", {
        get: function () { return name; },
        enumerable: true,
        configurable: true
    });
    return RequestHeaderFieldsTooLargeError;
}(HTTPError_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = RequestHeaderFieldsTooLargeError;

//# sourceMappingURL=RequestHeaderFieldsTooLargeError.js.map
