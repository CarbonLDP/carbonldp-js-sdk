System.register(["./../HTTPError"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var HTTPError_1;
    var name, statusCode, RequestEntityTooLargeError;
    return {
        setters:[
            function (HTTPError_1_1) {
                HTTPError_1 = HTTPError_1_1;
            }],
        execute: function() {
            name = "RequestEntityTooLargeError";
            statusCode = 413;
            RequestEntityTooLargeError = (function (_super) {
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
            }(HTTPError_1.default));
            exports_1("default",RequestEntityTooLargeError);
        }
    }
});

//# sourceMappingURL=RequestEntityTooLargeError.js.map
