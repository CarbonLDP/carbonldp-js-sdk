/// <reference path="./../typings/tsd.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var SDKContext = require("./SDKContext");
var ObjectSchema = require("./ObjectSchema");
var AbstractContext = (function (_super) {
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AbstractContext;

//# sourceMappingURL=AbstractContext.js.map
