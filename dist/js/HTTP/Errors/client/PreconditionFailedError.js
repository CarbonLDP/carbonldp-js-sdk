System.register(["./../HTTPError"], function(exports_1) {
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var HTTPError_1;
    var name, statusCode, PreconditionFailedError;
    return {
        setters:[
            function (HTTPError_1_1) {
                HTTPError_1 = HTTPError_1_1;
            }],
        execute: function() {
            name = "PreconditionFailedError";
            statusCode = 412;
            PreconditionFailedError = (function (_super) {
                __extends(PreconditionFailedError, _super);
                function PreconditionFailedError() {
                    _super.apply(this, arguments);
                }
                Object.defineProperty(PreconditionFailedError, "statusCode", {
                    get: function () { return statusCode; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(PreconditionFailedError.prototype, "name", {
                    get: function () { return name; },
                    enumerable: true,
                    configurable: true
                });
                return PreconditionFailedError;
            })(HTTPError_1.default);
            exports_1("default",PreconditionFailedError);
        }
    }
});

//# sourceMappingURL=PreconditionFailedError.js.map
