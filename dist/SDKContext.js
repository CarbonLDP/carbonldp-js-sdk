"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
}
Object.defineProperty(exports, "__esModule", { value: true });
var Auth = __importStar(require("./Auth"));
var ACE_1 = require("./Auth/ACE");
var ACL_1 = require("./Auth/ACL");
var Document_1 = require("./Document");
var Documents_1 = require("./Documents");
var Errors = __importStar(require("./Errors"));
var AddMemberAction_1 = require("./LDP/AddMemberAction");
var CarbonError_1 = require("./LDP/CarbonError");
var CarbonMap_1 = require("./LDP/CarbonMap");
var CarbonMapEntry_1 = require("./LDP/CarbonMapEntry");
var DocumentMetadata_1 = require("./LDP/DocumentMetadata");
var ErrorResponse_1 = require("./LDP/ErrorResponse");
var RemoveMemberAction_1 = require("./LDP/RemoveMemberAction");
var ResponseMetadata_1 = require("./LDP/ResponseMetadata");
var ValidationError_1 = require("./LDP/ValidationError");
var Messaging = __importStar(require("./Messaging"));
var ObjectSchema = __importStar(require("./ObjectSchema"));
var ProtectedDocument_1 = require("./ProtectedDocument");
var RDF = __importStar(require("./RDF"));
var SHACL = __importStar(require("./SHACL"));
var QueryMetadata_1 = require("./SPARQL/QueryDocument/QueryMetadata");
var PlatformMetadata_1 = require("./System/PlatformMetadata");
var Utils_1 = require("./Utils");
var SDKContext = (function () {
    function SDKContext() {
        this.generalObjectSchema = new ObjectSchema.DigestedObjectSchema();
        this.typeObjectSchemaMap = new Map();
        this.auth = new Auth.Class(this);
        this.documents = new Documents_1.Documents(this);
        this.registerDefaultObjectSchemas();
    }
    Object.defineProperty(SDKContext.prototype, "baseURI", {
        get: function () { return ""; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SDKContext.prototype, "parentContext", {
        get: function () { return null; },
        enumerable: true,
        configurable: true
    });
    SDKContext.prototype.resolve = function (relativeURI) {
        return RDF.URI.Util.resolve(this.baseURI, relativeURI);
    };
    SDKContext.prototype._resolvePath = function (path) {
        var leftSearchedPaths = path.split(".");
        var currentSearchedPaths = [];
        var url = "";
        var documentPaths = this.settings && this.settings.paths;
        while (leftSearchedPaths.length) {
            var containerKey = leftSearchedPaths.shift();
            currentSearchedPaths.push(containerKey);
            var containerPath = documentPaths ? documentPaths[containerKey] : null;
            if (!containerPath)
                throw new Errors.IllegalStateError("The path \"" + currentSearchedPaths.join(".") + "\" hasn't been declared.");
            var slug = Utils_1.isString(containerPath) ? containerPath : containerPath.slug;
            if (!slug)
                throw new Errors.IllegalStateError("The path \"" + currentSearchedPaths.join(".") + "\" doesn't have a slug set.");
            url = RDF.URI.Util.resolve(url, slug);
            documentPaths = Utils_1.isObject(containerPath) ? containerPath.paths : null;
        }
        return this.resolve(url);
    };
    SDKContext.prototype.hasObjectSchema = function (type) {
        type = this._resolveTypeURI(type);
        if (this.typeObjectSchemaMap.has(type))
            return true;
        return !!this.parentContext && this.parentContext.hasObjectSchema(type);
    };
    SDKContext.prototype.getObjectSchema = function (type) {
        if (type === void 0) { type = null; }
        if (!!type) {
            type = this._resolveTypeURI(type);
            if (this.typeObjectSchemaMap.has(type))
                return this.typeObjectSchemaMap.get(type);
            if (!!this.parentContext && this.parentContext.hasObjectSchema(type))
                return this.parentContext.getObjectSchema(type);
            return null;
        }
        else {
            if (!this.generalObjectSchema && !this.parentContext)
                throw new Errors.IllegalStateError();
            var generalSchema = this.generalObjectSchema || this.parentContext.getObjectSchema();
            var clonedSchema = ObjectSchema.ObjectSchemaDigester
                .combineDigestedObjectSchemas([generalSchema]);
            if (clonedSchema.vocab === null && this.settings && this.settings.vocabulary)
                clonedSchema.vocab = this.resolve(this.settings.vocabulary);
            if (!clonedSchema.base)
                clonedSchema.base = this.baseURI;
            return clonedSchema;
        }
    };
    SDKContext.prototype.extendObjectSchema = function (typeOrObjectSchema, objectSchema) {
        if (objectSchema === void 0) { objectSchema = null; }
        var type = objectSchema ? typeOrObjectSchema : null;
        objectSchema = !!objectSchema ? objectSchema : typeOrObjectSchema;
        var digestedSchema = ObjectSchema.ObjectSchemaDigester.digestSchema(objectSchema);
        if (!type) {
            this.extendGeneralObjectSchema(digestedSchema);
        }
        else {
            this.extendTypeObjectSchema(digestedSchema, type);
        }
    };
    SDKContext.prototype.clearObjectSchema = function (type) {
        if (type === void 0) { type = null; }
        if (!type) {
            this.generalObjectSchema = !!this.parentContext ? null : new ObjectSchema.DigestedObjectSchema();
        }
        else {
            type = this._resolveTypeURI(type);
            this.typeObjectSchemaMap.delete(type);
        }
    };
    SDKContext.prototype.extendGeneralObjectSchema = function (digestedSchema) {
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
        this.generalObjectSchema = ObjectSchema.ObjectSchemaDigester.combineDigestedObjectSchemas([
            digestedSchemaToExtend,
            digestedSchema,
        ]);
    };
    SDKContext.prototype.extendTypeObjectSchema = function (digestedSchema, type) {
        type = this._resolveTypeURI(type);
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
        var extendedDigestedSchema = ObjectSchema.ObjectSchemaDigester.combineDigestedObjectSchemas([
            digestedSchemaToExtend,
            digestedSchema,
        ]);
        this.typeObjectSchemaMap.set(type, extendedDigestedSchema);
    };
    SDKContext.prototype.registerDefaultObjectSchemas = function () {
        this.extendObjectSchema(Document_1.Document.TYPE, Document_1.Document.SCHEMA);
        this.extendObjectSchema(ProtectedDocument_1.ProtectedDocument.TYPE, ProtectedDocument_1.ProtectedDocument.SCHEMA);
        this.extendObjectSchema(PlatformMetadata_1.PlatformMetadata.TYPE, PlatformMetadata_1.PlatformMetadata.SCHEMA);
        this.extendObjectSchema(AddMemberAction_1.AddMemberAction.TYPE, AddMemberAction_1.AddMemberAction.SCHEMA);
        this.extendObjectSchema(CarbonError_1.CarbonError.TYPE, CarbonError_1.CarbonError.SCHEMA);
        this.extendObjectSchema(CarbonMap_1.CarbonMap.TYPE, CarbonMap_1.CarbonMap.SCHEMA);
        this.extendObjectSchema(CarbonMapEntry_1.CarbonMapEntry.SCHEMA);
        this.extendObjectSchema(DocumentMetadata_1.DocumentMetadata.TYPE, DocumentMetadata_1.DocumentMetadata.SCHEMA);
        this.extendObjectSchema(ErrorResponse_1.ErrorResponse.TYPE, ErrorResponse_1.ErrorResponse.SCHEMA);
        this.extendObjectSchema(RemoveMemberAction_1.RemoveMemberAction.TYPE, RemoveMemberAction_1.RemoveMemberAction.SCHEMA);
        this.extendObjectSchema(ResponseMetadata_1.ResponseMetadata.TYPE, ResponseMetadata_1.ResponseMetadata.SCHEMA);
        this.extendObjectSchema(ValidationError_1.ValidationError.TYPE, ValidationError_1.ValidationError.SCHEMA);
        this.extendObjectSchema(Auth.Role.RDF_CLASS, Auth.Role.SCHEMA);
        this.extendObjectSchema(ACE_1.ACE.TYPE, ACE_1.ACE.SCHEMA);
        this.extendObjectSchema(ACL_1.ACL.TYPE, ACL_1.ACL.SCHEMA);
        this.extendObjectSchema(Auth.User.RDF_CLASS, Auth.User.SCHEMA);
        this.extendObjectSchema(Auth.Credentials.RDF_CLASS, Auth.Credentials.SCHEMA);
        this.extendObjectSchema(Auth.Ticket.RDF_CLASS, Auth.Ticket.SCHEMA);
        this.extendObjectSchema(Auth.Token.RDF_CLASS, Auth.Token.SCHEMA);
        this.extendObjectSchema(SHACL.ValidationReport.RDF_CLASS, SHACL.ValidationReport.SCHEMA);
        this.extendObjectSchema(SHACL.ValidationResult.RDF_CLASS, SHACL.ValidationResult.SCHEMA);
        this.extendObjectSchema(QueryMetadata_1.QueryMetadata.TYPE, QueryMetadata_1.QueryMetadata.SCHEMA);
        this.extendObjectSchema(Messaging.AccessPointCreated.RDF_CLASS, Messaging.AccessPointCreated.SCHEMA);
        this.extendObjectSchema(Messaging.ChildCreated.RDF_CLASS, Messaging.ChildCreated.SCHEMA);
        this.extendObjectSchema(Messaging.DocumentCreatedDetails.RDF_CLASS, Messaging.DocumentCreatedDetails.SCHEMA);
        this.extendObjectSchema(Messaging.DocumentDeleted.RDF_CLASS, Messaging.DocumentDeleted.SCHEMA);
        this.extendObjectSchema(Messaging.DocumentModified.RDF_CLASS, Messaging.DocumentModified.SCHEMA);
        this.extendObjectSchema(Messaging.MemberAdded.RDF_CLASS, Messaging.MemberAdded.SCHEMA);
        this.extendObjectSchema(Messaging.MemberAddedDetails.RDF_CLASS, Messaging.MemberAddedDetails.SCHEMA);
        this.extendObjectSchema(Messaging.MemberRemoved.RDF_CLASS, Messaging.MemberRemoved.SCHEMA);
        this.extendObjectSchema(Messaging.MemberRemovedDetails.RDF_CLASS, Messaging.MemberRemovedDetails.SCHEMA);
    };
    SDKContext.prototype._resolveTypeURI = function (uri) {
        return ObjectSchema.ObjectSchemaUtils.resolveURI(uri, this.getObjectSchema(), { vocab: true });
    };
    return SDKContext;
}());
exports.SDKContext = SDKContext;
exports.globalContext = new SDKContext();
exports.default = exports.globalContext;

//# sourceMappingURL=SDKContext.js.map
