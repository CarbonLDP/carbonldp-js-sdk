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
var name = "PreconditionFailedError";
var statusCode = 412;
var PreconditionFailedError = (function (_super) {
    __extends(PreconditionFailedError, _super);
    function PreconditionFailedError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(PreconditionFailedError, "statusCode", {
        get: function () { return statusCode; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PreconditionFailedError.prototype, "name", {
        get: function () { return name; },
        enumerable: true,
        configurable: true
    });
    return PreconditionFailedError;
}(HTTPError_1.HTTPError));
exports.PreconditionFailedError = PreconditionFailedError;

//# sourceMappingURL=PreconditionFailedError.js.map
