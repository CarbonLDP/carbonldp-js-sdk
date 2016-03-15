"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var HTTPError_1 = require("./../HTTPError");
var name = "TooManyRequestsError";
var statusCode = 429;
var TooManyRequestsError = (function (_super) {
    __extends(TooManyRequestsError, _super);
    function TooManyRequestsError() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(TooManyRequestsError, "statusCode", {
        get: function () { return statusCode; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TooManyRequestsError.prototype, "name", {
        get: function () { return name; },
        enumerable: true,
        configurable: true
    });
    return TooManyRequestsError;
}(HTTPError_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TooManyRequestsError;

//# sourceMappingURL=TooManyRequestsError.js.map
