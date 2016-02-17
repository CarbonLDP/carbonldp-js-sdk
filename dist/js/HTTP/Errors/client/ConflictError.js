System.register(["./../HTTPError"], function(exports_1) {
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var HTTPError_1;
    var name, statusCode, ConflictError;
    return {
        setters:[
            function (HTTPError_1_1) {
                HTTPError_1 = HTTPError_1_1;
            }],
        execute: function() {
            name = "ConflictError";
            statusCode = 409;
            ConflictError = (function (_super) {
                __extends(ConflictError, _super);
                function ConflictError() {
                    _super.apply(this, arguments);
                }
                Object.defineProperty(ConflictError, "statusCode", {
                    get: function () { return statusCode; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ConflictError.prototype, "name", {
                    get: function () { return name; },
                    enumerable: true,
                    configurable: true
                });
                return ConflictError;
            })(HTTPError_1.default);
            exports_1("default",ConflictError);
        }
    }
});

//# sourceMappingURL=ConflictError.js.map
