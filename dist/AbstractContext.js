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
var SDKContext = require("./SDKContext");
var Class = (function (_super) {
    __extends(Class, _super);
    function Class(parentContext) {
        if (parentContext === void 0) { parentContext = null; }
        var _this = _super.call(this) || this;
        _this._parentContext = !!parentContext ? parentContext : SDKContext.instance;
        _this.generalObjectSchema = null;
        _this.typeObjectSchemaMap = new Map();
        return _this;
    }
    Object.defineProperty(Class.prototype, "parentContext", {
        get: function () { return this._parentContext; },
        enumerable: true,
        configurable: true
    });
    ;
    return Class;
}(SDKContext.Class));
exports.Class = Class;
exports.default = Class;

//# sourceMappingURL=AbstractContext.js.map
