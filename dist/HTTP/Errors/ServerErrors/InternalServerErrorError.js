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
var name = "InternalServerErrorError";
var statusCode = 500;
var InternalServerErrorError = (function (_super) {
    __extends(InternalServerErrorError, _super);
    function InternalServerErrorError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(InternalServerErrorError, "statusCode", {
        get: function () { return statusCode; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InternalServerErrorError.prototype, "name", {
        get: function () { return name; },
        enumerable: true,
        configurable: true
    });
    return InternalServerErrorError;
}(HTTPError_1.HTTPError));
exports.InternalServerErrorError = InternalServerErrorError;

//# sourceMappingURL=InternalServerErrorError.js.map
