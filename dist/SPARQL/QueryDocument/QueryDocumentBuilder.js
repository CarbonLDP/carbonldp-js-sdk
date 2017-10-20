"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var QueryObject = require("./QueryObject");
var QueryValue = require("./QueryValue");
var inherit = Object.freeze({});
var Class = (function () {
    function Class(queryContext) {
        this.inherit = inherit;
        this._context = queryContext;
    }
    Class.prototype.property = function (name) {
        return this._context.getProperty(name);
    };
    Class.prototype.value = function (value) {
        return new QueryValue.Class(this._context, value);
    };
    Class.prototype.object = function (object) {
        return new QueryObject.Class(this._context, object);
    };
    Class.prototype.withType = function (iriClass) {
        throw new Error("Not implemented");
    };
    Class.prototype.properties = function (propertiesSchema) {
        throw new Error("Not implemented");
    };
    return Class;
}());
exports.Class = Class;
exports.default = Class;

//# sourceMappingURL=QueryDocumentBuilder.js.map
