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
var HTTPError_1 = require("../HTTPError");
var name = "TooManyRequestsError";
var statusCode = 429;
var TooManyRequestsError = (function (_super) {
    __extends(TooManyRequestsError, _super);
    function TooManyRequestsError() {
        return _super !== null && _super.apply(this, arguments) || this;
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
}(HTTPError_1.HTTPError));
exports.TooManyRequestsError = TooManyRequestsError;
exports.default = TooManyRequestsError;

//# sourceMappingURL=TooManyRequestsError.js.map
