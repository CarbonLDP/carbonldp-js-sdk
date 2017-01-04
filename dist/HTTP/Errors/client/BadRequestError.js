"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var HTTPError_1 = require("./../HTTPError");
var name = "BadRequestError";
var statusCode = 400;
var BadRequestError = (function (_super) {
    __extends(BadRequestError, _super);
    function BadRequestError(message, response) {
        var _this = _super.call(this, message, response) || this;
        Object.setPrototypeOf(_this, BadRequestError.prototype);
        return _this;
    }
    Object.defineProperty(BadRequestError, "statusCode", {
        get: function () { return statusCode; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BadRequestError.prototype, "name", {
        get: function () { return name; },
        enumerable: true,
        configurable: true
    });
    return BadRequestError;
}(HTTPError_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = BadRequestError;

//# sourceMappingURL=BadRequestError.js.map
