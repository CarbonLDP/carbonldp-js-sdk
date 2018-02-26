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
var AbstractError = (function (_super) {
    __extends(AbstractError, _super);
    function AbstractError(message) {
        var _newTarget = this.constructor;
        var _this = _super.call(this, message) || this;
        Object.setPrototypeOf(_this, _newTarget.prototype);
        if ("captureStackTrace" in Error)
            Error.captureStackTrace(_this, _this.constructor);
        return _this;
    }
    Object.defineProperty(AbstractError.prototype, "name", {
        get: function () { return "AbstractError"; },
        enumerable: true,
        configurable: true
    });
    return AbstractError;
}(Error));
exports.AbstractError = AbstractError;
exports.default = AbstractError;

//# sourceMappingURL=AbstractError.js.map
