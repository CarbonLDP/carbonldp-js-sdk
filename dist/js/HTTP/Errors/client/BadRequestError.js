System.register(["./../HTTPError"], function(exports_1) {
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var HTTPError_1;
    var name, statusCode, BadRequestError;
    return {
        setters:[
            function (HTTPError_1_1) {
                HTTPError_1 = HTTPError_1_1;
            }],
        execute: function() {
            name = "BadRequestError";
            statusCode = 400;
            BadRequestError = (function (_super) {
                __extends(BadRequestError, _super);
                function BadRequestError() {
                    _super.apply(this, arguments);
                }
                Object.defineProperty(BadRequestError, "statusCode", {
                    get: function () { return statusCode; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BadRequestError.prototype, "name", {
                    get: function () { return name; },
                    enumerable: true,
                    configurable: true
                });
                return BadRequestError;
            })(HTTPError_1.default);
            exports_1("default",BadRequestError);
        }
    }
});

//# sourceMappingURL=BadRequestError.js.map
