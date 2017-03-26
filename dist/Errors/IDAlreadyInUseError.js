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
var AbstractError_1 = require("./AbstractError");
var IDAlreadyInUseError = (function (_super) {
    __extends(IDAlreadyInUseError, _super);
    function IDAlreadyInUseError(message) {
        var _this = _super.call(this, message) || this;
        Object.setPrototypeOf(_this, IDAlreadyInUseError.prototype);
        return _this;
    }
    Object.defineProperty(IDAlreadyInUseError.prototype, "name", {
        get: function () { return "IDAlreadyInUseError"; },
        enumerable: true,
        configurable: true
    });
    return IDAlreadyInUseError;
}(AbstractError_1.default));
exports.default = IDAlreadyInUseError;

//# sourceMappingURL=IDAlreadyInUseError.js.map
