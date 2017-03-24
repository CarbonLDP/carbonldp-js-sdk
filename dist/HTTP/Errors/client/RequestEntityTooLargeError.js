"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var HTTPError_1 = require("./../HTTPError");
var name = "RequestEntityTooLargeError";
var statusCode = 413;
var RequestEntityTooLargeError = (function (_super) {
    __extends(RequestEntityTooLargeError, _super);
    function RequestEntityTooLargeError(message, response) {
        var _this = _super.call(this, message, response) || this;
        Object.setPrototypeOf(_this, RequestEntityTooLargeError.prototype);
        return _this;
    }
    Object.defineProperty(RequestEntityTooLargeError, "statusCode", {
        get: function () { return statusCode; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RequestEntityTooLargeError.prototype, "name", {
        get: function () { return name; },
        enumerable: true,
        configurable: true
    });
    return RequestEntityTooLargeError;
}(HTTPError_1.default));
exports.RequestEntityTooLargeError = RequestEntityTooLargeError;
exports.default = RequestEntityTooLargeError;

//# sourceMappingURL=RequestEntityTooLargeError.js.map
