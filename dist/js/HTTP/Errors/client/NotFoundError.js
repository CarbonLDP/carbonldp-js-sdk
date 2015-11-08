var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var HTTPError_1 = require('./../HTTPError');
var name = 'NotFoundError';
var statusCode = 404;
var NotFoundError = (function (_super) {
    __extends(NotFoundError, _super);
    function NotFoundError() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(NotFoundError, "statusCode", {
        get: function () { return statusCode; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NotFoundError.prototype, "name", {
        get: function () { return name; },
        enumerable: true,
        configurable: true
    });
    return NotFoundError;
})(HTTPError_1.default);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = NotFoundError;

//# sourceMappingURL=NotFoundError.js.map
