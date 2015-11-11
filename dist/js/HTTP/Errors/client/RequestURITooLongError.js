var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var HTTPError_1 = require("./../HTTPError");
var name = "RequestURITooLongError";
var statusCode = 414;
var RequestURITooLongError = (function (_super) {
    __extends(RequestURITooLongError, _super);
    function RequestURITooLongError() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(RequestURITooLongError, "statusCode", {
        get: function () { return statusCode; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RequestURITooLongError.prototype, "name", {
        get: function () { return name; },
        enumerable: true,
        configurable: true
    });
    return RequestURITooLongError;
})(HTTPError_1.default);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = RequestURITooLongError;

//# sourceMappingURL=RequestURITooLongError.js.map
