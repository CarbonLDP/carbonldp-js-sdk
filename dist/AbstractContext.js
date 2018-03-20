"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var SDKContext_1 = require("./SDKContext");
var AbstractContext = (function (_super) {
    __extends(AbstractContext, _super);
    function AbstractContext(parentContext) {
        var _this = _super.call(this) || this;
        _this._parentContext = parentContext ? parentContext : SDKContext_1.globalContext;
        _this.generalObjectSchema = null;
        _this.typeObjectSchemaMap = new Map();
        return _this;
    }
    Object.defineProperty(AbstractContext.prototype, "baseURI", {
        get: function () { return this._baseURI; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractContext.prototype, "parentContext", {
        get: function () { return this._parentContext; },
        enumerable: true,
        configurable: true
    });
    return AbstractContext;
}(SDKContext_1.SDKContext));
exports.AbstractContext = AbstractContext;

//# sourceMappingURL=AbstractContext.js.map
