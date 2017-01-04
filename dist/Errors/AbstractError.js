"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AbstractError = (function (_super) {
    __extends(AbstractError, _super);
    function AbstractError(message) {
        var _this = _super.call(this, message) || this;
        if ("captureStackTrace" in Error)
            Error.captureStackTrace(_this, _this.constructor);
        _this.message = message;
        return _this;
    }
    Object.defineProperty(AbstractError.prototype, "name", {
        get: function () { return "AbstractError"; },
        enumerable: true,
        configurable: true
    });
    AbstractError.prototype.toString = function () {
        return this.name + ": " + this.message;
    };
    return AbstractError;
}(Error));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AbstractError;

//# sourceMappingURL=AbstractError.js.map
