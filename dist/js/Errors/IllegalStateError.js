var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AbstractError_1 = require("./AbstractError");
var IllegalStateError = (function (_super) {
    __extends(IllegalStateError, _super);
    function IllegalStateError() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(IllegalStateError.prototype, "name", {
        get: function () { return "IllegalStateError"; },
        enumerable: true,
        configurable: true
    });
    return IllegalStateError;
})(AbstractError_1.default);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = IllegalStateError;

//# sourceMappingURL=IllegalStateError.js.map
