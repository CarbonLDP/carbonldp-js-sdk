System.register(["./../HTTPError"], function(exports_1) {
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var HTTPError_1;
    var name, statusCode, UnsupportedMediaTypeError;
    return {
        setters:[
            function (HTTPError_1_1) {
                HTTPError_1 = HTTPError_1_1;
            }],
        execute: function() {
            name = "UnsupportedMediaTypeError";
            statusCode = 415;
            UnsupportedMediaTypeError = (function (_super) {
                __extends(UnsupportedMediaTypeError, _super);
                function UnsupportedMediaTypeError() {
                    _super.apply(this, arguments);
                }
                Object.defineProperty(UnsupportedMediaTypeError, "statusCode", {
                    get: function () { return statusCode; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(UnsupportedMediaTypeError.prototype, "name", {
                    get: function () { return name; },
                    enumerable: true,
                    configurable: true
                });
                return UnsupportedMediaTypeError;
            })(HTTPError_1.default);
            exports_1("default",UnsupportedMediaTypeError);
        }
    }
});

//# sourceMappingURL=UnsupportedMediaTypeError.js.map
