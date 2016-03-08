System.register(["./../HTTPError"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var HTTPError_1;
    var name, statusCode, InternalServerError;
    return {
        setters:[
            function (HTTPError_1_1) {
                HTTPError_1 = HTTPError_1_1;
            }],
        execute: function() {
            name = "InternalServerError";
            statusCode = 500;
            InternalServerError = (function (_super) {
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
            }(HTTPError_1.default));
            exports_1("default",InternalServerError);
        }
    }
});

//# sourceMappingURL=InternalServerError.js.map
