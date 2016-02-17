System.register(["./AbstractError"], function(exports_1) {
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var AbstractError_1;
    var IllegalArgumentError;
    return {
        setters:[
            function (AbstractError_1_1) {
                AbstractError_1 = AbstractError_1_1;
            }],
        execute: function() {
            IllegalArgumentError = (function (_super) {
                __extends(IllegalArgumentError, _super);
                function IllegalArgumentError() {
                    _super.apply(this, arguments);
                }
                Object.defineProperty(IllegalArgumentError.prototype, "name", {
                    get: function () { return "IllegalArgumentError"; },
                    enumerable: true,
                    configurable: true
                });
                return IllegalArgumentError;
            })(AbstractError_1.default);
            exports_1("default",IllegalArgumentError);
        }
    }
});

//# sourceMappingURL=IllegalArgumentError.js.map
