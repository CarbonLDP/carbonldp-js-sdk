System.register(["./../HTTPError"], function(exports_1) {
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var HTTPError_1;
    var name, statusCode, MethodNotAcceptableError;
    return {
        setters:[
            function (HTTPError_1_1) {
                HTTPError_1 = HTTPError_1_1;
            }],
        execute: function() {
            name = "MethodNotAcceptableError";
            statusCode = 406;
            MethodNotAcceptableError = (function (_super) {
                __extends(MethodNotAcceptableError, _super);
                function MethodNotAcceptableError() {
                    _super.apply(this, arguments);
                }
                Object.defineProperty(MethodNotAcceptableError, "statusCode", {
                    get: function () { return statusCode; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(MethodNotAcceptableError.prototype, "name", {
                    get: function () { return name; },
                    enumerable: true,
                    configurable: true
                });
                return MethodNotAcceptableError;
            })(HTTPError_1.default);
            exports_1("default",MethodNotAcceptableError);
        }
    }
});

//# sourceMappingURL=NotAcceptableError.js.map
