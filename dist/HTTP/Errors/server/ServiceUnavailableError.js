"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var HTTPError_1 = require("./../HTTPError");
var name = "ServiceUnavailableError";
var statusCode = 503;
var ServiceUnavailableError = (function (_super) {
    __extends(ServiceUnavailableError, _super);
    function ServiceUnavailableError(message, response) {
        var _this = _super.call(this, message, response) || this;
        Object.setPrototypeOf(_this, ServiceUnavailableError.prototype);
        return _this;
    }
    Object.defineProperty(ServiceUnavailableError, "statusCode", {
        get: function () { return statusCode; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ServiceUnavailableError.prototype, "name", {
        get: function () { return name; },
        enumerable: true,
        configurable: true
    });
    return ServiceUnavailableError;
}(HTTPError_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ServiceUnavailableError;

//# sourceMappingURL=ServiceUnavailableError.js.map
