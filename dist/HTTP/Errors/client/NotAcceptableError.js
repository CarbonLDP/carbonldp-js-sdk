var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var HTTPError_1 = require('./../HTTPError');
var name = 'MethodNotAcceptableError';
var statusCode = 406;
var MethodNotAcceptableError = (function (_super) {
    __extends(MethodNotAcceptableError, _super);
    function MethodNotAcceptableError() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(MethodNotAcceptableError, "statusCode", {
        get: function () { return statusCode; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MethodNotAcceptableError.prototype, "name", {
        get: function () { return name; },
        enumerable: true,
        configurable: true
    });
    return MethodNotAcceptableError;
})(HTTPError_1.default);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = MethodNotAcceptableError;
//# sourceMappingURL=NotAcceptableError.js.map