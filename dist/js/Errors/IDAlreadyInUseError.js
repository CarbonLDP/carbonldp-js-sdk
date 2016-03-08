System.register(["./AbstractError"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var AbstractError_1;
    var IDAlreadyInUseError;
    return {
        setters:[
            function (AbstractError_1_1) {
                AbstractError_1 = AbstractError_1_1;
            }],
        execute: function() {
            IDAlreadyInUseError = (function (_super) {
                __extends(IDAlreadyInUseError, _super);
                function IDAlreadyInUseError() {
                    _super.apply(this, arguments);
                }
                Object.defineProperty(IDAlreadyInUseError.prototype, "name", {
                    get: function () { return "IDAlreadyInUseError"; },
                    enumerable: true,
                    configurable: true
                });
                return IDAlreadyInUseError;
            }(AbstractError_1.default));
            exports_1("default",IDAlreadyInUseError);
        }
    }
});

//# sourceMappingURL=IDAlreadyInUseError.js.map
