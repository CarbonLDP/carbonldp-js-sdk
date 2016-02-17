System.register(["./HTTPError"], function(exports_1) {
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var HTTPError_1;
    var name, UnknownError;
    return {
        setters:[
            function (HTTPError_1_1) {
                HTTPError_1 = HTTPError_1_1;
            }],
        execute: function() {
            name = "UnknownError";
            UnknownError = (function (_super) {
                __extends(UnknownError, _super);
                function UnknownError() {
                    _super.apply(this, arguments);
                }
                Object.defineProperty(UnknownError.prototype, "name", {
                    get: function () { return name; },
                    enumerable: true,
                    configurable: true
                });
                return UnknownError;
            })(HTTPError_1.default);
            exports_1("default",UnknownError);
        }
    }
});

//# sourceMappingURL=UnknownError.js.map
