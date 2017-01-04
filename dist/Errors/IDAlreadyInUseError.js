"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AbstractError_1 = require("./AbstractError");
var IDAlreadyInUseError = (function (_super) {
    __extends(IDAlreadyInUseError, _super);
    function IDAlreadyInUseError() {
        return _super.apply(this, arguments) || this;
    }
    Object.defineProperty(IDAlreadyInUseError.prototype, "name", {
        get: function () { return "IDAlreadyInUseError"; },
        enumerable: true,
        configurable: true
    });
    return IDAlreadyInUseError;
}(AbstractError_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = IDAlreadyInUseError;

//# sourceMappingURL=IDAlreadyInUseError.js.map
