System.register(["./AbstractError"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var AbstractError_1;
    var IllegalStateError;
    return {
        setters:[
            function (AbstractError_1_1) {
                AbstractError_1 = AbstractError_1_1;
            }],
        execute: function() {
            IllegalStateError = (function (_super) {
                __extends(IllegalStateError, _super);
                function IllegalStateError(message) {
                    if (message === void 0) { message = ""; }
                    _super.call(this, message);
                }
                Object.defineProperty(IllegalStateError.prototype, "name", {
                    get: function () { return "IllegalStateError"; },
                    enumerable: true,
                    configurable: true
                });
                return IllegalStateError;
            }(AbstractError_1.default));
            exports_1("default",IllegalStateError);
        }
    }
});

//# sourceMappingURL=IllegalStateError.js.map
