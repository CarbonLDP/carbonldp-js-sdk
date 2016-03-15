"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var HTTPError_1 = require("./../HTTPError");
var name = "BadGatewayError";
var statusCode = 502;
var BadGatewayError = (function (_super) {
    __extends(BadGatewayError, _super);
    function BadGatewayError() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(BadGatewayError, "statusCode", {
        get: function () { return statusCode; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BadGatewayError.prototype, "name", {
        get: function () { return name; },
        enumerable: true,
        configurable: true
    });
    return BadGatewayError;
}(HTTPError_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = BadGatewayError;

//# sourceMappingURL=BadGatewayError.js.map
