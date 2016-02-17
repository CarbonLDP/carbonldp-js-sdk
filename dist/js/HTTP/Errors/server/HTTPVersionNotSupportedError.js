System.register(["./../HTTPError"], function(exports_1) {
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var HTTPError_1;
    var name, statusCode, HTTPVersionNotSupportedError;
    return {
        setters:[
            function (HTTPError_1_1) {
                HTTPError_1 = HTTPError_1_1;
            }],
        execute: function() {
            name = "HTTPVersionNotSupportedError";
            statusCode = 505;
            HTTPVersionNotSupportedError = (function (_super) {
                __extends(HTTPVersionNotSupportedError, _super);
                function HTTPVersionNotSupportedError() {
                    _super.apply(this, arguments);
                }
                Object.defineProperty(HTTPVersionNotSupportedError, "statusCode", {
                    get: function () { return statusCode; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(HTTPVersionNotSupportedError.prototype, "name", {
                    get: function () { return name; },
                    enumerable: true,
                    configurable: true
                });
                return HTTPVersionNotSupportedError;
            })(HTTPError_1.default);
            exports_1("default",HTTPVersionNotSupportedError);
        }
    }
});

//# sourceMappingURL=HTTPVersionNotSupportedError.js.map
