"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var SDKContext = require("./SDKContext");
var Class = (function (_super) {
    __extends(Class, _super);
    function Class(parentContext) {
        if (parentContext === void 0) { parentContext = null; }
        _super.call(this);
        this._parentContext = !!parentContext ? parentContext : SDKContext.instance;
        this.generalObjectSchema = null;
        this.typeObjectSchemaMap = new Map();
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Class;

//# sourceMappingURL=AbstractContext.js.map
