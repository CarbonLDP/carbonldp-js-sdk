"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var HTTPError_1 = require("./../HTTPError");
var name = "PreconditionRequiredError";
var statusCode = 428;
var PreconditionRequiredError = (function (_super) {
    __extends(PreconditionRequiredError, _super);
    function PreconditionRequiredError() {
        return _super.apply(this, arguments) || this;
    }
    Object.defineProperty(PreconditionRequiredError, "statusCode", {
        get: function () { return statusCode; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PreconditionRequiredError.prototype, "name", {
        get: function () { return name; },
        enumerable: true,
        configurable: true
    });
    return PreconditionRequiredError;
}(HTTPError_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = PreconditionRequiredError;

//# sourceMappingURL=PreconditionRequiredError.js.map
