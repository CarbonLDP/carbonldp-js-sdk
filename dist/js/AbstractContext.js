/// <reference path="./../typings/typings.d.ts" />
System.register(["./SDKContext", "./ObjectSchema"], function(exports_1) {
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var SDKContext, ObjectSchema;
    var AbstractContext;
    return {
        setters:[
            function (SDKContext_1) {
                SDKContext = SDKContext_1;
            },
            function (ObjectSchema_1) {
                ObjectSchema = ObjectSchema_1;
            }],
        execute: function() {
            AbstractContext = (function (_super) {
                __extends(AbstractContext, _super);
                function AbstractContext(parentContext) {
                    if (parentContext === void 0) { parentContext = null; }
                    _super.call(this);
                    this._parentContext = !!parentContext ? parentContext : SDKContext.instance;
                    this.generalObjectSchema = !!parentContext ? null : new ObjectSchema.DigestedObjectSchema();
                }
                Object.defineProperty(AbstractContext.prototype, "parentContext", {
                    get: function () { return this._parentContext; },
                    enumerable: true,
                    configurable: true
                });
                ;
                return AbstractContext;
            })(SDKContext.Class);
            exports_1("default",AbstractContext);
        }
    }
});

//# sourceMappingURL=AbstractContext.js.map
