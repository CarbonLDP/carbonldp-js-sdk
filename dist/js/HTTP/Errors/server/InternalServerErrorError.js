var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var HTTPError_1 = require('./../HTTPError');
var name = 'InternalServerError';
var statusCode = 500;
var InternalServerError = (function (_super) {
    __extends(InternalServerError, _super);
    function InternalServerError() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(InternalServerError, "statusCode", {
        get: function () { return statusCode; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InternalServerError.prototype, "name", {
        get: function () { return name; },
        enumerable: true,
        configurable: true
    });
    return InternalServerError;
})(HTTPError_1.default);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = InternalServerError;

//# sourceMappingURL=InternalServerErrorError.js.map
