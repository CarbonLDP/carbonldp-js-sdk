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
var name = "UnsupportedMediaTypeError";
var statusCode = 415;
var UnsupportedMediaTypeError = (function (_super) {
    __extends(UnsupportedMediaTypeError, _super);
    function UnsupportedMediaTypeError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(UnsupportedMediaTypeError, "statusCode", {
        get: function () { return statusCode; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UnsupportedMediaTypeError.prototype, "name", {
        get: function () { return name; },
        enumerable: true,
        configurable: true
    });
    return UnsupportedMediaTypeError;
}(HTTPError_1.HTTPError));
exports.UnsupportedMediaTypeError = UnsupportedMediaTypeError;

//# sourceMappingURL=UnsupportedMediaTypeError.js.map
