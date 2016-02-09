System.register(["./AbstractError"], function(exports_1) {
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var AbstractError_1;
    var NotImplementedError;
    return {
        setters:[
            function (AbstractError_1_1) {
                AbstractError_1 = AbstractError_1_1;
            }],
        execute: function() {
            NotImplementedError = (function (_super) {
                __extends(NotImplementedError, _super);
                function NotImplementedError(message) {
                    if (message === void 0) { message = ""; }
                    _super.call(this, message);
                }
                Object.defineProperty(NotImplementedError.prototype, "name", {
                    get: function () { return "NotImplementedError"; },
                    enumerable: true,
                    configurable: true
                });
                return NotImplementedError;
            })(AbstractError_1.default);
            exports_1("default",NotImplementedError);
        }
    }
});

//# sourceMappingURL=NotImplementedError.js.map
