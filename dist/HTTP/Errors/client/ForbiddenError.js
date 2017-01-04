"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var HTTPError_1 = require("./../HTTPError");
var name = "ForbiddenError";
var statusCode = 403;
var ForbiddenError = (function (_super) {
    __extends(ForbiddenError, _super);
    function ForbiddenError(message, response) {
        var _this = _super.call(this, message, response) || this;
        Object.setPrototypeOf(_this, ForbiddenError.prototype);
        return _this;
    }
    Object.defineProperty(ForbiddenError, "statusCode", {
        get: function () { return statusCode; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ForbiddenError.prototype, "name", {
        get: function () { return name; },
        enumerable: true,
        configurable: true
    });
    return ForbiddenError;
}(HTTPError_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ForbiddenError;

//# sourceMappingURL=ForbiddenError.js.map
