"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var IllegalArgumentError_1 = require("../Errors/IllegalArgumentError");
var JSONLDConverter_1 = require("../JSONLD/JSONLDConverter");
var DigestedObjectSchema_1 = require("../ObjectSchema/DigestedObjectSchema");
var ObjectSchemaDigester_1 = require("../ObjectSchema/ObjectSchemaDigester");
var URI_1 = require("../RDF/URI");
var AbstractContext = (function () {
    function AbstractContext(parentContext) {
        this._parentContext = parentContext;
        this._typeObjectSchemaMap = new Map();
        this.jsonldConverter = new JSONLDConverter_1.JSONLDConverter(parentContext && parentContext.jsonldConverter.literalSerializers);
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
    AbstractContext.prototype.resolve = function (relativeURI) {
        return URI_1.URI.resolve(this.baseURI, relativeURI);
    };
    AbstractContext.prototype.hasObjectSchema = function (type) {
        type = this.__resolveTypeURI(type);
        if (this._typeObjectSchemaMap.has(type))
            return true;
        return !!this.parentContext && this.parentContext.hasObjectSchema(type);
    };
    AbstractContext.prototype.getObjectSchema = function (type) {
        if (!!type) {
            type = this.__resolveTypeURI(type);
            if (this._typeObjectSchemaMap.has(type))
                return this._typeObjectSchemaMap.get(type);
            if (this.parentContext && this.parentContext.hasObjectSchema(type))
                return this.parentContext.getObjectSchema(type);
            throw new IllegalArgumentError_1.IllegalArgumentError("\"" + type + "\" hasn't an object schema.");
        }
        else {
            var generalSchema = !this._generalObjectSchema ?
                this.parentContext ?
                    this.parentContext.getObjectSchema() :
                    new DigestedObjectSchema_1.DigestedObjectSchema() :
                ObjectSchemaDigester_1.ObjectSchemaDigester
                    .combineDigestedObjectSchemas([this._generalObjectSchema]);
            if (generalSchema.vocab === void 0 && this._settings && this._settings.vocabulary)
                generalSchema.vocab = this.resolve(this._settings.vocabulary);
            if (!generalSchema.base)
                generalSchema.base = this.baseURI;
            return generalSchema;
        }
    };
    AbstractContext.prototype.extendObjectSchema = function (typeOrObjectSchema, objectSchema) {
        var type = objectSchema ? typeOrObjectSchema : null;
        objectSchema = objectSchema ? objectSchema : typeOrObjectSchema;
        var digestedSchema = ObjectSchemaDigester_1.ObjectSchemaDigester.digestSchema(objectSchema);
        if (!type) {
            this.__extendGeneralSchema(digestedSchema);
        }
        else {
            this.__extendTypeSchema(digestedSchema, type);
        }
        return this;
    };
    AbstractContext.prototype.clearObjectSchema = function (type) {
        if (!type) {
            this._generalObjectSchema = this.parentContext ? null : new DigestedObjectSchema_1.DigestedObjectSchema();
        }
        else {
            type = this.__resolveTypeURI(type);
            this._typeObjectSchemaMap.delete(type);
        }
    };
    AbstractContext.prototype._getTypeObjectSchemas = function () {
        var types = this.__getObjectSchemasTypes();
        return types.map(this.getObjectSchema, this);
    };
    AbstractContext.prototype.__getObjectSchemasTypes = function () {
        var localTypes = Array.from(this._typeObjectSchemaMap.keys());
        if (!this._parentContext)
            return localTypes;
        var allTypes = this._parentContext.__getObjectSchemasTypes();
        for (var _i = 0, localTypes_1 = localTypes; _i < localTypes_1.length; _i++) {
            var type = localTypes_1[_i];
            if (allTypes.indexOf(type) !== -1)
                continue;
            allTypes.push(type);
        }
        return allTypes;
    };
    AbstractContext.prototype.__extendGeneralSchema = function (digestedSchema) {
        var digestedSchemaToExtend;
        if (!!this._generalObjectSchema) {
            digestedSchemaToExtend = this._generalObjectSchema;
        }
        else if (!!this.parentContext) {
            digestedSchemaToExtend = this.parentContext.getObjectSchema();
        }
        else {
            digestedSchemaToExtend = new DigestedObjectSchema_1.DigestedObjectSchema();
        }
        this._generalObjectSchema = ObjectSchemaDigester_1.ObjectSchemaDigester._combineSchemas([
            digestedSchemaToExtend,
            digestedSchema,
        ]);
    };
    AbstractContext.prototype.__extendTypeSchema = function (digestedSchema, type) {
        type = this.__resolveTypeURI(type);
        var digestedSchemaToExtend;
        if (this._typeObjectSchemaMap.has(type)) {
            digestedSchemaToExtend = this._typeObjectSchemaMap.get(type);
        }
        else if (!!this.parentContext && this.parentContext.hasObjectSchema(type)) {
            digestedSchemaToExtend = this.parentContext.getObjectSchema(type);
        }
        else {
            digestedSchemaToExtend = new DigestedObjectSchema_1.DigestedObjectSchema();
        }
        var extendedDigestedSchema = ObjectSchemaDigester_1.ObjectSchemaDigester.combineDigestedObjectSchemas([
            digestedSchemaToExtend,
            digestedSchema,
        ]);
        this._typeObjectSchemaMap.set(type, extendedDigestedSchema);
    };
    AbstractContext.prototype.__resolveTypeURI = function (uri) {
        return this.getObjectSchema()
            .resolveURI(uri, { vocab: true });
    };
    return AbstractContext;
}());
exports.AbstractContext = AbstractContext;

//# sourceMappingURL=AbstractContext.js.map
