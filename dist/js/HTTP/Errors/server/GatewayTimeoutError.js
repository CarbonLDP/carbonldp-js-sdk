var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var HTTPError_1 = require("./../HTTPError");
var name = "GatewayTimeoutError";
var statusCode = 504;
var GatewayTimeoutError = (function (_super) {
    __extends(GatewayTimeoutError, _super);
    function GatewayTimeoutError() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(GatewayTimeoutError, "statusCode", {
        get: function () { return statusCode; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GatewayTimeoutError.prototype, "name", {
        get: function () { return name; },
        enumerable: true,
        configurable: true
    });
    return GatewayTimeoutError;
})(HTTPError_1.default);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = GatewayTimeoutError;

//# sourceMappingURL=GatewayTimeoutError.js.map
