var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var HTTPError_1 = require('./../HTTPError');
var name = 'RequestEntityTooLargeError';
var statusCode = 413;
var RequestEntityTooLargeError = (function (_super) {
    __extends(RequestEntityTooLargeError, _super);
    function RequestEntityTooLargeError() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(RequestEntityTooLargeError, "statusCode", {
        get: function () { return statusCode; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RequestEntityTooLargeError.prototype, "name", {
        get: function () { return name; },
        enumerable: true,
        configurable: true
    });
    return RequestEntityTooLargeError;
})(HTTPError_1.default);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = RequestEntityTooLargeError;

//# sourceMappingURL=RequestEntityTooLargeError.js.map
