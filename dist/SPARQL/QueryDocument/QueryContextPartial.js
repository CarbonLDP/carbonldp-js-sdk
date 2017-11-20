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
var QueryContext = require("./QueryContext");
var Class = (function (_super) {
    __extends(Class, _super);
    function Class(document, context) {
        var _this = _super.call(this, context) || this;
        _this._document = document;
        return _this;
    }
    Class.prototype.getSchemaFor = function (object, path) {
        if (path === void 0)
            return _super.prototype.getSchemaFor.call(this, object);
        var parts = path.split(/\./g).slice(1);
        var schemaLibrary = this._document;
        while (parts.length) {
            var part = parts.shift();
            var values = Array.isArray(schemaLibrary[part]) ?
                schemaLibrary[part] : [schemaLibrary[part]];
            schemaLibrary = values.find(function (value) { return value && "_partialMetadata" in value; });
            if (!schemaLibrary)
                return _super.prototype.getSchemaFor.call(this, object);
        }
        return schemaLibrary._partialMetadata.schema;
    };
    return Class;
}(QueryContext.Class));
exports.Class = Class;
exports.default = Class;

//# sourceMappingURL=QueryContextPartial.js.map