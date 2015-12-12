/// <reference path="../typings/tsd.d.ts" />
var jsonld = require("jsonld");
var Errors = require("./Errors");
var HTTP = require("./HTTP");
var RDF = require("./RDF");
var Utils = require("./Utils");
var ContextDigester = require("./ContextDigester");
var JSONLDConverter = require("./JSONLDConverter");
var PersistedDocument = require("./PersistedDocument");
var Pointer = require("./Pointer");
var NS = require("./NS");
var LDP = require("./NS/LDP");
function parse(input) {
    try {
        return JSON.parse(input);
    }
    catch (error) {
        // TODO: Handle SyntaxError
        throw error;
    }
}
function expand(input, options) {
    return new Promise(function (resolve, reject) {
        jsonld.expand(input.result, options, function (error, expanded) {
            if (error) {
                // TODO: Handle jsonld.expand error
                throw error;
            }
            input.result = expanded;
            resolve(input);
        });
    });
}
var Documents = (function () {
    function Documents(context) {
        if (context === void 0) { context = null; }
        this.context = context;
        this.pointers = new Map();
        if (!!this.context && !!this.context.parentContext) {
            var contextJSONLDConverter = this.context.parentContext.Documents.jsonldConverter;
            this._jsonldConverter = new JSONLDConverter.Class(contextJSONLDConverter.literalSerializers);
        }
        else {
            this._jsonldConverter = new JSONLDConverter.Class();
        }
    }
    Object.defineProperty(Documents.prototype, "jsonldConverter", {
        get: function () { return this._jsonldConverter; },
        enumerable: true,
        configurable: true
    });
    Documents.prototype.inScope = function (idOrPointer) {
        var id = Pointer.Factory.is(idOrPointer) ? idOrPointer.uri : idOrPointer;
        if (RDF.URI.Util.isBNodeID(id))
            return false;
        if (RDF.URI.Util.hasFragment(id))
            return false;
        if (!!this.context) {
            var baseURI = this.context.getBaseURI();
            if (RDF.URI.Util.isAbsolute(id) && RDF.URI.Util.isBaseOf(baseURI, id))
                return true;
        }
        else {
            if (RDF.URI.Util.isAbsolute(id))
                return true;
        }
        if (!!this.context && !!this.context.parentContext)
            return this.context.parentContext.Documents.inScope(id);
        return false;
    };
    Documents.prototype.hasPointer = function (id) {
        id = this.getPointerID(id);
        if (this.pointers.has(id))
            return true;
        if (!!this.context && !!this.context.parentContext)
            return this.context.parentContext.Documents.hasPointer(id);
        return false;
    };
    Documents.prototype.getPointer = function (id) {
        var localID = this.getPointerID(id);
        if (!localID) {
            if (!!this.context && !!this.context.parentContext)
                return this.context.parentContext.Documents.getPointer(id);
            throw new Errors.IllegalArgumentError("The pointer id is not supported by this module.");
        }
        var pointer;
        if (!this.pointers.has(localID)) {
            pointer = this.createPointer(localID);
            this.pointers.set(localID, pointer);
        }
        return this.pointers.get(localID);
    };
    Documents.prototype.get = function (uri, requestOptions) {
        var _this = this;
        if (requestOptions === void 0) { requestOptions = {}; }
        var pointerID = this.getPointerID(uri);
        if (!!this.context)
            uri = this.context.resolve(uri);
        if (this.pointers.has(pointerID)) {
        }
        if (this.context && this.context.Auth.isAuthenticated())
            this.context.Auth.addAuthentication(requestOptions);
        HTTP.Request.Util.setAcceptHeader("application/ld+json", requestOptions);
        HTTP.Request.Util.setPreferredInteractionModel(LDP.Class.RDFSource, requestOptions);
        return HTTP.Request.Service.get(uri, requestOptions).then(function (response) {
            var parsedObject = parse(response.data);
            return expand({
                result: parsedObject,
                response: response,
            });
        }).then(function (processedResponse) {
            var etag = HTTP.Response.Util.getETag(processedResponse.response);
            if (etag === null)
                throw new HTTP.Errors.BadResponseError("The response doesn't contain an ETag", processedResponse.response);
            var expandedResult = processedResponse.result;
            var rdfDocuments = RDF.Document.Util.getDocuments(expandedResult);
            var rdfDocument = _this.getRDFDocument(rdfDocuments, processedResponse.response);
            var documentResources = RDF.Document.Util.getDocumentResources(rdfDocument);
            if (documentResources.length > 1)
                throw new HTTP.Errors.BadResponseError("The RDFDocument contains more than one document resource.", processedResponse.response);
            if (documentResources.length === 0)
                throw new HTTP.Errors.BadResponseError("The RDFDocument doesn\'t contain a document resource.", processedResponse.response);
            var documentResource = documentResources[0];
            var fragmentResources = RDF.Document.Util.getBNodeResources(rdfDocument);
            var namedFragmentResources = RDF.Document.Util.getFragmentResources(rdfDocument);
            var documentPointer = _this.getPointer(uri);
            var document = PersistedDocument.Factory.createFrom(documentPointer, uri, _this);
            document._etag = etag;
            var fragments = [];
            for (var _i = 0; _i < fragmentResources.length; _i++) {
                var fragmentResource = fragmentResources[_i];
                fragments.push(document.createFragment(fragmentResource["@id"]));
            }
            var namedFragments = [];
            for (var _a = 0; _a < namedFragmentResources.length; _a++) {
                var namedFragmentResource = namedFragmentResources[_a];
                namedFragments.push(document.createNamedFragment(namedFragmentResource["@id"]));
            }
            _this.compact(documentResource, document, document);
            _this.compact(fragmentResources, fragments, document);
            _this.compact(namedFragmentResources, namedFragments, document);
            // TODO: Decorate additional behavior (container, app, etc.)
            return {
                result: document,
                response: processedResponse.response,
            };
        });
    };
    Documents.prototype.createChild = function (parentURI, child, requestOptions) {
        // TODO: Validate that the child is not persisted already
        if (requestOptions === void 0) { requestOptions = {}; }
        if (this.context && this.context.Auth.isAuthenticated())
            this.context.Auth.addAuthentication(requestOptions);
        HTTP.Request.Util.setAcceptHeader("application/ld+json", requestOptions);
        HTTP.Request.Util.setContentTypeHeader("application/ld+json", requestOptions);
        HTTP.Request.Util.setPreferredInteractionModel(LDP.Class.Container, requestOptions);
        // return HTTP.Request.Service.post( parentURI,
    };
    Documents.prototype.save = function (persistedDocument, requestOptions) {
        if (requestOptions === void 0) { requestOptions = {}; }
        if (!persistedDocument.isDirty())
            return new Promise(function (resolve) {
                resolve(null);
            });
        if (this.context && this.context.Auth.isAuthenticated())
            this.context.Auth.addAuthentication(requestOptions);
        HTTP.Request.Util.setAcceptHeader("application/ld+json", requestOptions);
        HTTP.Request.Util.setContentTypeHeader("application/ld+json", requestOptions);
        HTTP.Request.Util.setPreferredInteractionModel(LDP.Class.RDFSource, requestOptions);
        HTTP.Request.Util.setIfMatchHeader(persistedDocument._etag, requestOptions);
        return HTTP.Request.Service.put(persistedDocument.uri, persistedDocument.toJSON(), requestOptions);
    };
    Documents.prototype.delete = function (persistedDocument, requestOptions) {
        if (requestOptions === void 0) { requestOptions = {}; }
        if (this.context && this.context.Auth.isAuthenticated())
            this.context.Auth.addAuthentication(requestOptions);
        HTTP.Request.Util.setAcceptHeader("application/ld+json", requestOptions);
        HTTP.Request.Util.setPreferredInteractionModel(LDP.Class.RDFSource, requestOptions);
        HTTP.Request.Util.setIfMatchHeader(persistedDocument._etag, requestOptions);
        return HTTP.Request.Service.delete(persistedDocument.uri, persistedDocument.toJSON(), requestOptions);
    };
    Documents.prototype.getRDFDocument = function (rdfDocuments, response) {
        if (rdfDocuments.length === 0)
            throw new HTTP.Errors.BadResponseError("No document was returned.", response);
        if (rdfDocuments.length > 1)
            throw new Error("Unsupported: Multiple graphs are currently not supported.");
        return rdfDocuments[0];
    };
    Documents.prototype.getPointerID = function (uri) {
        if (RDF.URI.Util.isBNodeID(uri))
            throw new Errors.IllegalArgumentError("BNodes cannot be fetched directly.");
        if (RDF.URI.Util.hasFragment(uri))
            throw new Errors.IllegalArgumentError("Fragment URI's cannot be fetched directly.");
        if (!!this.context) {
            if (RDF.URI.Util.isRelative(uri)) {
                var baseURI = this.context.getBaseURI();
                if (!RDF.URI.Util.isBaseOf(baseURI, uri))
                    return null;
                return uri.substring(baseURI.length);
            }
            else {
                return uri;
            }
        }
        else {
            if (RDF.URI.Util.isRelative(uri))
                throw new Errors.IllegalArgumentError("This Documents instance doesn't support relative URIs.");
            return uri;
        }
    };
    Documents.prototype.createPointer = function (localID) {
        var uri = !!this.context ? this.context.resolve(localID) : localID;
        return {
            uri: uri,
            resolve: function () {
                // TODO
                return null;
            },
        };
    };
    Documents.prototype.compact = function (expandedObjectOrObjects, targetObjectOrObjects, pointerLibrary) {
        if (!Utils.isArray(expandedObjectOrObjects))
            return this.compactSingle(expandedObjectOrObjects, targetObjectOrObjects, pointerLibrary);
        var expandedObjects = expandedObjectOrObjects;
        var targetObjects = !!targetObjectOrObjects ? targetObjectOrObjects : [];
        for (var i = 0, length_1 = expandedObjects.length; i < length_1; i++) {
            var expandedObject = expandedObjects[i];
            var targetObject = targetObjects[i] = !!targetObjects[i] ? targetObjects[i] : {};
            this.compactSingle(expandedObject, targetObject, pointerLibrary);
        }
        return targetObjects;
    };
    Documents.prototype.compactSingle = function (expandedObject, targetObject, pointerLibrary) {
        var digestedContext;
        if (!!this.context) {
            var types = this.getExpandedObjectTypes(expandedObject);
            var typesDigestedContexts = [];
            for (var _i = 0; _i < types.length; _i++) {
                var type = types[_i];
                if (this.context.hasClassContext(type))
                    typesDigestedContexts.push(this.context.getClassContext(type));
            }
            if (typesDigestedContexts.length === 0) {
                digestedContext = this.context.getMainContext();
            }
            else {
                digestedContext = ContextDigester.Class.combineDigestedContexts(typesDigestedContexts);
            }
        }
        else {
            digestedContext = new ContextDigester.DigestedContext();
        }
        return this.jsonldConverter.compact(expandedObject, targetObject, digestedContext, pointerLibrary);
    };
    Documents.prototype.getExpandedObjectTypes = function (expandedObject) {
        var types = [];
        if (!expandedObject[NS.RDF.Predicate.type])
            return types;
        for (var _i = 0, _a = expandedObject[NS.RDF.Predicate.type]; _i < _a.length; _i++) {
            var typeObject = _a[_i];
            if (!typeObject["@id"])
                continue;
            types.push(typeObject["@id"]);
        }
        return types;
    };
    return Documents;
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Documents;

//# sourceMappingURL=Documents.js.map
