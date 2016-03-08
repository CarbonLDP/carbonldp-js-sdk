System.register(["./../HTTPError"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var HTTPError_1;
    var name, statusCode, GatewayTimeoutError;
    return {
        setters:[
            function (HTTPError_1_1) {
                HTTPError_1 = HTTPError_1_1;
            }],
        execute: function() {
            name = "GatewayTimeoutError";
            statusCode = 504;
            GatewayTimeoutError = (function (_super) {
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
            }(HTTPError_1.default));
            exports_1("default",GatewayTimeoutError);
        }
    }
});

//# sourceMappingURL=GatewayTimeoutError.js.map
