"use strict";
var AppRole = require("./App/Role");
var APIDescription = require("./APIDescription");
var Auth = require("./Auth");
var BlankNode = require("./BlankNode");
var Documents_1 = require("./Documents");
var Error = require("./LDP/Error");
var ErrorResponse = require("./LDP/ErrorResponse");
var Errors = require("./Errors");
var LDP = require("./LDP");
var NS = require("./NS");
var ObjectSchema = require("./ObjectSchema");
var ProtectedDocument = require("./ProtectedDocument");
var RDF = require("./RDF");
var RDFRepresentation = require("./RDFRepresentation");
var Class = (function () {
    function Class() {
        this.settings = new Map();
        this.generalObjectSchema = new ObjectSchema.DigestedObjectSchema();
        this.typeObjectSchemaMap = new Map();
        this.auth = null;
        this.documents = new Documents_1.default(this);
        this.registerDefaultObjectSchemas();
    }
    Object.defineProperty(Class.prototype, "parentContext", {
        get: function () { return null; },
        enumerable: true,
        configurable: true
    });
    Class.prototype.getBaseURI = function () {
        return this.resolve("");
    };
    Class.prototype.resolve = function (relativeURI) {
        return relativeURI;
    };
    Class.prototype.hasSetting = function (name) {
        return (this.settings.has(name))
            || (!!this.parentContext && this.parentContext.hasSetting(name));
    };
    Class.prototype.getSetting = function (name) {
        if (this.settings.has(name))
            return this.settings.get(name);
        if (this.parentContext && this.parentContext.hasSetting(name))
            return this.parentContext.getSetting(name);
        return null;
    };
    Class.prototype.setSetting = function (name, value) {
        this.settings.set(name, value);
    };
    Class.prototype.deleteSetting = function (name) {
        this.settings.delete(name);
    };
    Class.prototype.hasObjectSchema = function (type) {
        type = this.resolveTypeURI(type);
        if (this.typeObjectSchemaMap.has(type))
            return true;
        if (!!this.parentContext && this.parentContext.hasObjectSchema(type))
            return true;
        return false;
    };
    Class.prototype.getObjectSchema = function (type) {
        if (type === void 0) { type = null; }
        if (!!type) {
            type = this.resolveTypeURI(type);
            if (this.typeObjectSchemaMap.has(type))
                return this.typeObjectSchemaMap.get(type);
            if (!!this.parentContext && this.parentContext.hasObjectSchema(type))
                return this.parentContext.getObjectSchema(type);
            return null;
        }
        else {
            if (!!this.generalObjectSchema)
                return this.generalObjectSchema;
            if (!!this.parentContext)
                return this.parentContext.getObjectSchema();
            throw new Errors.IllegalStateError();
        }
    };
    Class.prototype.extendObjectSchema = function (typeOrObjectSchema, objectSchema) {
        if (objectSchema === void 0) { objectSchema = null; }
        var type = objectSchema ? typeOrObjectSchema : null;
        objectSchema = !!objectSchema ? objectSchema : typeOrObjectSchema;
        var digestedSchema = ObjectSchema.Digester.digestSchema(objectSchema);
        if (!type) {
            this.extendGeneralObjectSchema(digestedSchema);
        }
        else {
            this.extendTypeObjectSchema(digestedSchema, type);
        }
    };
    Class.prototype.clearObjectSchema = function (type) {
        if (type === void 0) { type = null; }
        if (!type) {
            this.generalObjectSchema = !!this.parentContext ? null : new ObjectSchema.DigestedObjectSchema();
        }
        else {
            type = this.resolveTypeURI(type);
            this.typeObjectSchemaMap.delete(type);
        }
    };
    Class.prototype.extendGeneralObjectSchema = function (digestedSchema) {
        var digestedSchemaToExtend;
        if (!!this.generalObjectSchema) {
            digestedSchemaToExtend = this.generalObjectSchema;
        }
        else if (!!this.parentContext) {
            digestedSchemaToExtend = this.parentContext.getObjectSchema();
        }
        else {
            digestedSchemaToExtend = new ObjectSchema.DigestedObjectSchema();
        }
        this.generalObjectSchema = ObjectSchema.Digester.combineDigestedObjectSchemas([
            new ObjectSchema.DigestedObjectSchema(),
            digestedSchemaToExtend,
            digestedSchema,
        ]);
    };
    Class.prototype.extendTypeObjectSchema = function (digestedSchema, type) {
        type = this.resolveTypeURI(type);
        var digestedSchemaToExtend;
        if (this.typeObjectSchemaMap.has(type)) {
            digestedSchemaToExtend = this.typeObjectSchemaMap.get(type);
        }
        else if (!!this.parentContext && this.parentContext.hasObjectSchema(type)) {
            digestedSchemaToExtend = this.parentContext.getObjectSchema(type);
        }
        else {
            digestedSchemaToExtend = new ObjectSchema.DigestedObjectSchema();
        }
        var extendedDigestedSchema = ObjectSchema.Digester.combineDigestedObjectSchemas([
            digestedSchemaToExtend,
            digestedSchema,
        ]);
        this.typeObjectSchemaMap.set(type, extendedDigestedSchema);
    };
    Class.prototype.registerDefaultObjectSchemas = function () {
        this.extendObjectSchema(BlankNode.SCHEMA);
        this.extendObjectSchema(ProtectedDocument.RDF_CLASS, ProtectedDocument.SCHEMA);
        this.extendObjectSchema(RDFRepresentation.RDF_CLASS, RDFRepresentation.SCHEMA);
        this.extendObjectSchema(APIDescription.RDF_CLASS, APIDescription.SCHEMA);
        this.extendObjectSchema(Error.RDF_CLASS, Error.SCHEMA);
        this.extendObjectSchema(ErrorResponse.RDF_CLASS, ErrorResponse.SCHEMA);
        this.extendObjectSchema(NS.CS.Class.Application, {
            "name": {
                "@id": NS.CS.Predicate.namae,
                "@type": NS.XSD.DataType.string,
            },
            "description": {
                "@id": NS.CS.Predicate.description,
                "@type": NS.XSD.DataType.string,
            },
            "rootContainer": {
                "@id": NS.CS.Predicate.rootContainer,
                "@type": "@id",
            },
            "allowsOrigins": {
                "@id": NS.CS.Predicate.allowsOrigin,
                "@container": "@set",
            },
        });
        this.extendObjectSchema(AppRole.RDF_CLASS, Auth.Role.SCHEMA);
        this.extendObjectSchema(AppRole.RDF_CLASS, AppRole.SCHEMA);
        this.extendObjectSchema(LDP.ResponseMetadata.RDF_CLASS, LDP.ResponseMetadata.SCHEMA);
        this.extendObjectSchema(LDP.ResourceMetadata.RDF_CLASS, LDP.ResourceMetadata.SCHEMA);
        this.extendObjectSchema(LDP.AddMemberAction.RDF_CLASS, LDP.AddMemberAction.SCHEMA);
        this.extendObjectSchema(LDP.RemoveMemberAction.RDF_CLASS, LDP.RemoveMemberAction.SCHEMA);
        this.extendObjectSchema(Auth.ACE.RDF_CLASS, Auth.ACE.SCHEMA);
        this.extendObjectSchema(Auth.ACL.RDF_CLASS, Auth.ACL.SCHEMA);
        this.extendObjectSchema(Auth.Agent.RDF_CLASS, Auth.Agent.SCHEMA);
        this.extendObjectSchema(Auth.Ticket.RDF_CLASS, Auth.Ticket.SCHEMA);
        this.extendObjectSchema(Auth.Token.RDF_CLASS, Auth.Token.SCHEMA);
    };
    Class.prototype.resolveTypeURI = function (uri) {
        if (RDF.URI.Util.isAbsolute(uri))
            return uri;
        var schema = this.getObjectSchema();
        var vocab;
        if (this.hasSetting("vocabulary"))
            vocab = this.resolve(this.getSetting("vocabulary"));
        if (RDF.URI.Util.isPrefixed(uri)) {
            uri = ObjectSchema.Digester.resolvePrefixedURI(uri, schema);
        }
        else if (vocab) {
            uri = vocab + uri;
        }
        return uri;
    };
    return Class;
}());
exports.Class = Class;
exports.instance = new Class();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = exports.instance;

//# sourceMappingURL=SDKContext.js.map
