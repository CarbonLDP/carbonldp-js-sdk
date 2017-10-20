"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var QueryVariable = require("./QueryVariable");
var Class = (function () {
    function Class(context) {
        this._context = context;
        this._propertiesMap = new Map();
        this._variablesCounter = 0;
        this._variablesMap = new Map();
    }
    Class.prototype.getVariable = function (name) {
        if (this._variablesMap.has(name))
            return this._variablesMap.get(name);
        var variable = new QueryVariable.Class(name, this._variablesCounter++);
        this._variablesMap.set(name, variable);
        return variable;
    };
    Class.prototype.getProperty = function (name) {
        if (!this._propertiesMap.has(name))
            throw new Error("The \"" + name + "\" property was not declared.");
        return this._propertiesMap.get(name);
    };
    Class.prototype.serializeLiteral = function (type, value) {
        type = this.expandIRI(type);
        if (!this._context.documents.jsonldConverter.literalSerializers.has(type))
            return "" + value;
        return this._context.documents.jsonldConverter.literalSerializers.get(type).serialize(value);
    };
    Class.prototype.expandIRI = function (iri) {
        return iri;
    };
    Class.prototype.compactIRI = function (iri) {
        return iri;
    };
    return Class;
}());
exports.Class = Class;
exports.default = Class;

//# sourceMappingURL=QueryContext.js.map
