System.register(["./../HTTPError"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var HTTPError_1;
    var name, statusCode, ServiceUnavailableError;
    return {
        setters:[
            function (HTTPError_1_1) {
                HTTPError_1 = HTTPError_1_1;
            }],
        execute: function() {
            name = "ServiceUnavailableError";
            statusCode = 503;
            ServiceUnavailableError = (function (_super) {
                __extends(ServiceUnavailableError, _super);
                function ServiceUnavailableError() {
                    _super.apply(this, arguments);
                }
                Object.defineProperty(ServiceUnavailableError, "statusCode", {
                    get: function () { return statusCode; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ServiceUnavailableError.prototype, "name", {
                    get: function () { return name; },
                    enumerable: true,
                    configurable: true
                });
                return ServiceUnavailableError;
            }(HTTPError_1.default));
            exports_1("default",ServiceUnavailableError);
        }
    }
});

//# sourceMappingURL=ServiceUnavailableError.js.map
