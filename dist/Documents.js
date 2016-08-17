"use strict";
var Errors = require("./Errors");
var HTTP = require("./HTTP");
var RDF = require("./RDF");
var Utils = require("./Utils");
var AccessPoint = require("./AccessPoint");
var ACL = require("./Auth/ACL");
var Document = require("./Document");
var FreeResources = require("./FreeResources");
var JSONLD = require("./JSONLD");
var PersistedACL = require("./Auth/PersistedACL");
var PersistedDocument = require("./PersistedDocument");
var PersistedProtectedDocument = require("./PersistedProtectedDocument");
var ProtectedDocument = require("./ProtectedDocument");
var Pointer = require("./Pointer");
var NS = require("./NS");
var ObjectSchema = require("./ObjectSchema");
var LDP = require("./LDP");
var SPARQL = require("./SPARQL");
var Resource = require("./Resource");
var RetrievalPreferences = require("./RetrievalPreferences");
var Documents = (function () {
    function Documents(context) {
        if (context === void 0) { context = null; }
        this.context = context;
        this.pointers = new Map();
        this.documentsBeingResolved = new Map();
        if (!!this.context && !!this.context.parentContext) {
            var contextJSONLDConverter = this.context.parentContext.documents.jsonldConverter;
            this._jsonldConverter = new JSONLD.Converter.Class(contextJSONLDConverter.literalSerializers);
        }
        else {
            this._jsonldConverter = new JSONLD.Converter.Class();
        }
    }
    Object.defineProperty(Documents.prototype, "jsonldConverter", {
        get: function () { return this._jsonldConverter; },
        enumerable: true,
        configurable: true
    });
    Documents.prototype.inScope = function (idOrPointer) {
        var id = Pointer.Factory.is(idOrPointer) ? idOrPointer.id : idOrPointer;
        if (RDF.URI.Util.isBNodeID(id))
            return false;
        if (!!this.context) {
            if (RDF.URI.Util.isPrefixed(id))
                id = ObjectSchema.Digester.resolvePrefixedURI(id, this.context.getObjectSchema());
            var baseURI = this.context.getBaseURI();
            if (RDF.URI.Util.isRelative(id))
                return true;
            if (RDF.URI.Util.isBaseOf(baseURI, id))
                return true;
        }
        else {
            if (RDF.URI.Util.isAbsolute(id))
                return true;
        }
        if (!!this.context && !!this.context.parentContext)
            return this.context.parentContext.documents.inScope(id);
        return RDF.URI.Util.isRelative(id);
    };
    Documents.prototype.hasPointer = function (id) {
        id = this.getPointerID(id);
        if (this.pointers.has(id))
            return true;
        if (!!this.context && !!this.context.parentContext)
            return this.context.parentContext.documents.hasPointer(id);
        return false;
    };
    Documents.prototype.getPointer = function (id) {
        var localID = this.getPointerID(id);
        if (localID === null) {
            if (!!this.context && !!this.context.parentContext)
                return this.context.parentContext.documents.getPointer(id);
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
        uri = this.getRequestURI(uri);
        this.setDefaultRequestOptions(requestOptions, NS.LDP.Class.RDFSource);
        if (this.hasPointer(uri)) {
            var pointer = this.getPointer(uri);
            if (pointer.isResolved()) {
                return Promise.resolve([pointer, null]);
            }
        }
        if (this.documentsBeingResolved.has(pointerID))
            return this.documentsBeingResolved.get(pointerID);
        var promise = HTTP.Request.Service.get(uri, requestOptions, new RDF.Document.Parser()).then(function (_a) {
            var rdfDocuments = _a[0], response = _a[1];
            var eTag = HTTP.Response.Util.getETag(response);
            if (eTag === null)
                throw new HTTP.Errors.BadResponseError("The response doesn't contain an ETag", response);
            var locationHeader = response.getHeader("Content-Location");
            if (!!locationHeader) {
                if (locationHeader.values.length !== 1)
                    throw new HTTP.Errors.BadResponseError("The response contains more than one Content-Location header.", response);
                uri = locationHeader.toString();
                if (!uri)
                    throw new HTTP.Errors.BadResponseError("The response doesn't contain a valid 'Content-Location' header.", response);
            }
            var rdfDocument = _this.getRDFDocument(uri, rdfDocuments, response);
            if (rdfDocument === null)
                throw new HTTP.Errors.BadResponseError("No document was returned.", response);
            var document = _this._getPersistedDocument(rdfDocument, response);
            document._etag = eTag;
            _this.documentsBeingResolved.delete(pointerID);
            return [document, response];
        });
        this.documentsBeingResolved.set(pointerID, promise);
        return promise;
    };
    Documents.prototype.exists = function (documentURI, requestOptions) {
        if (requestOptions === void 0) { requestOptions = {}; }
        documentURI = this.getRequestURI(documentURI);
        this.setDefaultRequestOptions(requestOptions, NS.LDP.Class.RDFSource);
        return HTTP.Request.Service.head(documentURI, requestOptions).then(function (response) { return [true, response]; }, function (error) {
            if (error.response.status === 404)
                return [false, error.response];
            return Promise.reject(error);
        });
    };
    Documents.prototype.createChild = function (parentURI, childObject, slugOrRequestOptions, requestOptions) {
        var _this = this;
        if (requestOptions === void 0) { requestOptions = {}; }
        var slug = Utils.isString(slugOrRequestOptions) ? slugOrRequestOptions : null;
        requestOptions = !Utils.isString(slugOrRequestOptions) && !!slugOrRequestOptions ? slugOrRequestOptions : requestOptions;
        if (PersistedDocument.Factory.is(childObject))
            return Promise.reject(new Errors.IllegalArgumentError("The child provided has been already persisted."));
        var childDocument = Document.Factory.is(childObject) ? childObject : Document.Factory.createFrom(childObject);
        parentURI = this.getRequestURI(parentURI);
        this.setDefaultRequestOptions(requestOptions, NS.LDP.Class.Container);
        HTTP.Request.Util.setContentTypeHeader("application/ld+json", requestOptions);
        if (childDocument.id) {
            var childURI = childDocument.id;
            if (!!this.context)
                childURI = this.context.resolve(childURI);
            if (!RDF.URI.Util.isBaseOf(parentURI, childURI)) {
                return Promise.reject(new Errors.IllegalArgumentError("The childDocument's URI is not relative to the parentURI specified"));
            }
        }
        if (childDocument["__CarbonSDK_InProgressOfPersisting"])
            return Promise.reject(new Errors.IllegalArgumentError("The childDocument is already being persisted."));
        Object.defineProperty(childDocument, "__CarbonSDK_InProgressOfPersisting", { configurable: true, enumerable: false, writable: false, value: true });
        var body = childDocument.toJSON(this, this.jsonldConverter);
        if (!!slug)
            HTTP.Request.Util.setSlug(slug, requestOptions);
        return HTTP.Request.Service.post(parentURI, body, requestOptions).then(function (response) {
            delete childDocument["__CarbonSDK_InProgressOfPersisting"];
            var locationHeader = response.getHeader("Location");
            if (locationHeader === null || locationHeader.values.length < 1)
                throw new HTTP.Errors.BadResponseError("The response is missing a Location header.", response);
            if (locationHeader.values.length !== 1)
                throw new HTTP.Errors.BadResponseError("The response contains more than one Location header.", response);
            var localID = _this.getPointerID(locationHeader.values[0].toString());
            var persistedDocument = PersistedDocument.Factory.decorate(_this.createPointerFrom(childDocument, localID), _this);
            _this.pointers.set(localID, persistedDocument);
            return [
                persistedDocument,
                response,
            ];
        });
    };
    Documents.prototype.createChildAndRetrieve = function (parentURI, childObject, slugOrRequestOptions, requestOptions) {
        var _this = this;
        var createResponse;
        return this.createChild(parentURI, childObject, slugOrRequestOptions, requestOptions).then(function (_a) {
            var document = _a[0], response = _a[1];
            createResponse = response;
            return _this.get(document.id);
        }).then(function (_a) {
            var persistedDocument = _a[0], response = _a[1];
            return [persistedDocument, [createResponse, response]];
        });
    };
    Documents.prototype.listChildren = function (parentURI, requestOptions) {
        var _this = this;
        if (requestOptions === void 0) { requestOptions = {}; }
        parentURI = this.getRequestURI(parentURI);
        this.setDefaultRequestOptions(requestOptions, NS.LDP.Class.Container);
        var containerRetrievalPreferences = {
            include: [
                NS.LDP.Class.PreferContainment,
            ],
            omit: [
                NS.LDP.Class.PreferMembership,
                NS.LDP.Class.PreferMinimalContainer,
                NS.C.Class.PreferContainmentResources,
                NS.C.Class.PreferMembershipResources,
            ],
        };
        HTTP.Request.Util.setContainerRetrievalPreferences(containerRetrievalPreferences, requestOptions);
        return HTTP.Request.Service.get(parentURI, requestOptions, new RDF.Document.Parser())
            .then(function (_a) {
            var rdfDocuments = _a[0], response = _a[1];
            var rdfDocument = _this.getRDFDocument(parentURI, rdfDocuments, response);
            if (rdfDocument === null)
                return [[], response];
            var documentResource = _this.getDocumentResource(rdfDocument, response);
            var childPointers = RDF.Value.Util.getPropertyPointers(documentResource, NS.LDP.Predicate.contains, _this);
            var persistedChildPointers = childPointers.map(function (pointer) { return PersistedDocument.Factory.decorate(pointer, _this); });
            return [persistedChildPointers, response];
        });
    };
    Documents.prototype.getChildren = function (parentURI, retPrefReqOpt, requestOptions) {
        var _this = this;
        var retrievalPreferences = RetrievalPreferences.Factory.is(retPrefReqOpt) ? retPrefReqOpt : null;
        requestOptions = HTTP.Request.Util.isOptions(retPrefReqOpt) ? retPrefReqOpt : (HTTP.Request.Util.isOptions(requestOptions) ? requestOptions : {});
        parentURI = this.getRequestURI(parentURI);
        this.setDefaultRequestOptions(requestOptions, NS.LDP.Class.Container);
        var containerURI = parentURI;
        if (!!retrievalPreferences)
            parentURI += RetrievalPreferences.Util.stringifyRetrievalPreferences(retrievalPreferences, this.getGeneralSchema());
        var containerRetrievalPreferences = {
            include: [
                NS.LDP.Class.PreferContainment,
                NS.C.Class.PreferContainmentResources,
            ],
            omit: [
                NS.LDP.Class.PreferMembership,
                NS.LDP.Class.PreferMinimalContainer,
                NS.C.Class.PreferMembershipResources,
            ],
        };
        HTTP.Request.Util.setContainerRetrievalPreferences(containerRetrievalPreferences, requestOptions);
        return HTTP.Request.Service.get(parentURI, requestOptions, new JSONLD.Parser.Class()).then(function (_a) {
            var expandedResult = _a[0], response = _a[1];
            var freeNodes = RDF.Node.Util.getFreeNodes(expandedResult);
            var rdfDocuments = RDF.Document.Util.getDocuments(expandedResult).filter(function (document) { return document["@id"] !== containerURI; });
            var resources = _this.getPersistedMetadataResources(freeNodes, rdfDocuments, response);
            return [resources, response];
        });
    };
    Documents.prototype.createAccessPoint = function (documentURI, accessPoint, slugOrRequestOptions, requestOptions) {
        var _this = this;
        if (requestOptions === void 0) { requestOptions = {}; }
        var slug = Utils.isString(slugOrRequestOptions) ? slugOrRequestOptions : null;
        requestOptions = !Utils.isString(slugOrRequestOptions) && !!slugOrRequestOptions ? slugOrRequestOptions : requestOptions;
        documentURI = this.getRequestURI(documentURI);
        this.setDefaultRequestOptions(requestOptions, NS.LDP.Class.RDFSource);
        HTTP.Request.Util.setContentTypeHeader("application/ld+json", requestOptions);
        if (PersistedDocument.Factory.is(accessPoint))
            return Promise.reject(new Errors.IllegalArgumentError("The accessPoint provided has been already persisted."));
        var accessPointDocument = AccessPoint.Factory.is(accessPoint) ? accessPoint
            : AccessPoint.Factory.createFrom(accessPoint, this.getPointer(documentURI), accessPoint.hasMemberRelation, accessPoint.isMemberOfRelation);
        if (accessPointDocument.membershipResource.id !== documentURI)
            return Promise.reject(new Errors.IllegalArgumentError("The documentURI must be the same as the accessPoint's membershipResource"));
        if (accessPointDocument.id) {
            var childURI = accessPointDocument.id;
            if (!!this.context)
                childURI = this.context.resolve(childURI);
            if (!RDF.URI.Util.isBaseOf(documentURI, childURI)) {
                return Promise.reject(new Errors.IllegalArgumentError("The accessPoint's URI is not relative to the parentURI specified"));
            }
        }
        if (accessPoint["__CarbonSDK_InProgressOfPersisting"])
            return Promise.reject(new Errors.IllegalArgumentError("The accessPoint is already being persisted."));
        Object.defineProperty(accessPoint, "__CarbonSDK_InProgressOfPersisting", { configurable: true, enumerable: false, writable: false, value: true });
        var body = accessPointDocument.toJSON(this, this.jsonldConverter);
        if (!!slug)
            HTTP.Request.Util.setSlug(slug, requestOptions);
        return HTTP.Request.Service.post(documentURI, body, requestOptions).then(function (response) {
            delete accessPoint["__CarbonSDK_InProgressOfPersisting"];
            var locationHeader = response.getHeader("Location");
            if (locationHeader === null || locationHeader.values.length < 1)
                throw new HTTP.Errors.BadResponseError("The response is missing a Location header.", response);
            if (locationHeader.values.length !== 1)
                throw new HTTP.Errors.BadResponseError("The response contains more than one Location header.", response);
            var localID = _this.getPointerID(locationHeader.values[0].toString());
            var persistedAccessPoint = PersistedDocument.Factory.decorate(_this.createPointerFrom(accessPointDocument, localID), _this);
            _this.pointers.set(localID, persistedAccessPoint);
            return [
                persistedAccessPoint,
                response,
            ];
        });
    };
    Documents.prototype.upload = function (parentURI, data, slugOrRequestOptions, requestOptions) {
        var _this = this;
        if (requestOptions === void 0) { requestOptions = {}; }
        var slug = Utils.isString(slugOrRequestOptions) ? slugOrRequestOptions : null;
        requestOptions = !Utils.isString(slugOrRequestOptions) && !!slugOrRequestOptions ? slugOrRequestOptions : requestOptions;
        if (typeof Blob !== "undefined") {
            if (!(data instanceof Blob))
                return Promise.reject(new Errors.IllegalArgumentError("The data is not a valid Blob object."));
            HTTP.Request.Util.setContentTypeHeader(data.type, requestOptions);
        }
        else {
            if (!(data instanceof Buffer))
                return Promise.reject(new Errors.IllegalArgumentError("The data is not a valid Buffer object."));
            var fileType = require("file-type");
            var bufferType = fileType(data);
            HTTP.Request.Util.setContentTypeHeader(bufferType ? bufferType.mime : "application/octet-stream", requestOptions);
        }
        parentURI = this.getRequestURI(parentURI);
        this.setDefaultRequestOptions(requestOptions, NS.LDP.Class.Container);
        if (!!slug)
            HTTP.Request.Util.setSlug(slug, requestOptions);
        return HTTP.Request.Service.post(parentURI, data, requestOptions).then(function (response) {
            var locationHeader = response.getHeader("Location");
            if (locationHeader === null || locationHeader.values.length < 1)
                throw new HTTP.Errors.BadResponseError("The response is missing a Location header.", response);
            if (locationHeader.values.length !== 1)
                throw new HTTP.Errors.BadResponseError("The response contains more than one Location header.", response);
            var locationURI = locationHeader.values[0].toString();
            var pointer = _this.getPointer(locationURI);
            return [
                pointer,
                response,
            ];
        });
    };
    Documents.prototype.listMembers = function (uri, nonReadReqOpt, reqOpt) {
        var _this = this;
        var includeNonReadable = Utils.isBoolean(nonReadReqOpt) ? nonReadReqOpt : true;
        var requestOptions = HTTP.Request.Util.isOptions(nonReadReqOpt) ? nonReadReqOpt : (HTTP.Request.Util.isOptions(reqOpt) ? reqOpt : {});
        uri = this.getRequestURI(uri);
        this.setDefaultRequestOptions(requestOptions, NS.LDP.Class.Container);
        var containerRetrievalPreferences = {
            include: [
                NS.LDP.Class.PreferMinimalContainer,
                NS.LDP.Class.PreferMembership,
            ],
            omit: [
                NS.LDP.Class.PreferContainment,
                NS.C.Class.PreferContainmentResources,
                NS.C.Class.PreferMembershipResources,
            ],
        };
        if (includeNonReadable) {
            containerRetrievalPreferences.include.push(NS.C.Class.NonReadableMembershipResourceTriples);
        }
        else {
            containerRetrievalPreferences.omit.push(NS.C.Class.NonReadableMembershipResourceTriples);
        }
        HTTP.Request.Util.setContainerRetrievalPreferences(containerRetrievalPreferences, requestOptions);
        return HTTP.Request.Service.get(uri, requestOptions, new RDF.Document.Parser()).then(function (_a) {
            var rdfDocuments = _a[0], response = _a[1];
            var rdfDocument = _this.getRDFDocument(uri, rdfDocuments, response);
            if (rdfDocument === null)
                throw new HTTP.Errors.BadResponseError("No document was returned.", response);
            var documentResource = _this.getDocumentResource(rdfDocument, response);
            var membershipResource = _this.getMembershipResource(documentResource, rdfDocuments, response);
            if (membershipResource === null)
                return [[], response];
            var hasMemberRelation = RDF.Node.Util.getPropertyURI(documentResource, NS.LDP.Predicate.hasMemberRelation);
            var memberPointers = RDF.Value.Util.getPropertyPointers(membershipResource, hasMemberRelation, _this);
            var persistedMemberPointers = memberPointers.map(function (pointer) { return PersistedDocument.Factory.decorate(pointer, _this); });
            return [persistedMemberPointers, response];
        });
    };
    Documents.prototype.getMembers = function (uri, nonReadRetPrefReqOpt, retPrefReqOpt, requestOptions) {
        var _this = this;
        var includeNonReadable = Utils.isBoolean(nonReadRetPrefReqOpt) ? nonReadRetPrefReqOpt : true;
        var retrievalPreferences = RetrievalPreferences.Factory.is(nonReadRetPrefReqOpt) ? nonReadRetPrefReqOpt : (RetrievalPreferences.Factory.is(retPrefReqOpt) ? retPrefReqOpt : null);
        requestOptions = HTTP.Request.Util.isOptions(nonReadRetPrefReqOpt) ? nonReadRetPrefReqOpt : (HTTP.Request.Util.isOptions(retPrefReqOpt) ? retPrefReqOpt : (HTTP.Request.Util.isOptions(requestOptions) ? requestOptions : {}));
        uri = this.getRequestURI(uri);
        this.setDefaultRequestOptions(requestOptions, NS.LDP.Class.Container);
        var containerURI = uri;
        if (!!retrievalPreferences)
            uri += RetrievalPreferences.Util.stringifyRetrievalPreferences(retrievalPreferences, this.getGeneralSchema());
        var containerRetrievalPreferences = {
            include: [
                NS.LDP.Class.PreferMinimalContainer,
                NS.LDP.Class.PreferMembership,
                NS.C.Class.PreferMembershipResources,
            ],
            omit: [
                NS.LDP.Class.PreferContainment,
                NS.C.Class.PreferContainmentResources,
            ],
        };
        if (includeNonReadable) {
            containerRetrievalPreferences.include.push(NS.C.Class.NonReadableMembershipResourceTriples);
        }
        else {
            containerRetrievalPreferences.omit.push(NS.C.Class.NonReadableMembershipResourceTriples);
        }
        HTTP.Request.Util.setContainerRetrievalPreferences(containerRetrievalPreferences, requestOptions);
        return HTTP.Request.Service.get(uri, requestOptions, new JSONLD.Parser.Class()).then(function (_a) {
            var expandedResult = _a[0], response = _a[1];
            var freeNodes = RDF.Node.Util.getFreeNodes(expandedResult);
            var rdfDocuments = RDF.Document.Util.getDocuments(expandedResult);
            var rdfDocument = _this.getRDFDocument(containerURI, rdfDocuments, response);
            if (rdfDocument === null)
                throw new HTTP.Errors.BadResponseError("No document was returned.", response);
            var containerResource = _this.getDocumentResource(rdfDocument, response);
            var membershipResource = _this.getMembershipResource(containerResource, rdfDocuments, response);
            if (membershipResource === null)
                return [[], response];
            rdfDocuments = rdfDocuments.filter(function (targetRDFDocument) {
                return !RDF.Node.Util.areEqual(targetRDFDocument, containerResource)
                    && !RDF.Node.Util.areEqual(targetRDFDocument, membershipResource);
            });
            var resources = _this.getPersistedMetadataResources(freeNodes, rdfDocuments, response);
            return [resources, response];
        });
    };
    Documents.prototype.addMember = function (documentURI, memberORUri, requestOptions) {
        if (requestOptions === void 0) { requestOptions = {}; }
        return this.addMembers(documentURI, [memberORUri], requestOptions);
    };
    Documents.prototype.addMembers = function (documentURI, members, requestOptions) {
        if (requestOptions === void 0) { requestOptions = {}; }
        var pointers = [];
        for (var _i = 0, members_1 = members; _i < members_1.length; _i++) {
            var member = members_1[_i];
            member = Utils.isString(member) ? this.getPointer(member) : member;
            if (!Pointer.Factory.is(member))
                return Promise.reject(new Errors.IllegalArgumentError("No Carbon.Pointer or URI provided."));
            pointers.push(member);
        }
        documentURI = this.getRequestURI(documentURI);
        this.setDefaultRequestOptions(requestOptions, NS.LDP.Class.Container);
        HTTP.Request.Util.setContentTypeHeader("application/ld+json", requestOptions);
        var document = LDP.AddMemberAction.Factory.createDocument(pointers);
        var body = document.toJSON(this, this.jsonldConverter);
        return HTTP.Request.Service.put(documentURI, body, requestOptions);
    };
    Documents.prototype.removeMember = function (documentURI, memberORUri, requestOptions) {
        if (requestOptions === void 0) { requestOptions = {}; }
        return this.removeMembers(documentURI, [memberORUri], requestOptions);
    };
    Documents.prototype.removeMembers = function (documentURI, members, requestOptions) {
        if (requestOptions === void 0) { requestOptions = {}; }
        var pointers = [];
        for (var _i = 0, members_2 = members; _i < members_2.length; _i++) {
            var member = members_2[_i];
            member = Utils.isString(member) ? this.getPointer(member) : member;
            if (!Pointer.Factory.is(member))
                return Promise.reject(new Errors.IllegalArgumentError("No Carbon.Pointer or URI provided."));
            pointers.push(member);
        }
        documentURI = this.getRequestURI(documentURI);
        this.setDefaultRequestOptions(requestOptions, NS.LDP.Class.Container);
        HTTP.Request.Util.setContentTypeHeader("application/ld+json", requestOptions);
        var document = LDP.RemoveMemberAction.Factory.createDocument(pointers);
        var containerRetrievalPreferences = {
            include: [NS.C.Class.PreferSelectedMembershipTriples],
            omit: [NS.C.Class.PreferMembershipTriples],
        };
        HTTP.Request.Util.setContainerRetrievalPreferences(containerRetrievalPreferences, requestOptions, false);
        var body = document.toJSON(this, this.jsonldConverter);
        return HTTP.Request.Service.delete(documentURI, body, requestOptions);
    };
    Documents.prototype.removeAllMembers = function (documentURI, requestOptions) {
        if (requestOptions === void 0) { requestOptions = {}; }
        documentURI = this.getRequestURI(documentURI);
        this.setDefaultRequestOptions(requestOptions, NS.LDP.Class.Container);
        var containerRetrievalPreferences = {
            include: [
                NS.C.Class.PreferMembershipTriples,
            ],
            omit: [
                NS.C.Class.PreferMembershipResources,
                NS.C.Class.PreferContainmentTriples,
                NS.C.Class.PreferContainmentResources,
                NS.C.Class.PreferContainer,
            ],
        };
        HTTP.Request.Util.setContainerRetrievalPreferences(containerRetrievalPreferences, requestOptions, false);
        return HTTP.Request.Service.delete(documentURI, requestOptions);
    };
    Documents.prototype.save = function (persistedDocument, requestOptions) {
        if (requestOptions === void 0) { requestOptions = {}; }
        var uri = this.getRequestURI(persistedDocument.id);
        this.setDefaultRequestOptions(requestOptions, NS.LDP.Class.RDFSource);
        HTTP.Request.Util.setContentTypeHeader("application/ld+json", requestOptions);
        HTTP.Request.Util.setIfMatchHeader(persistedDocument._etag, requestOptions);
        persistedDocument._normalize();
        var body = persistedDocument.toJSON(this, this.jsonldConverter);
        return HTTP.Request.Service.put(uri, body, requestOptions).then(function (response) {
            return [persistedDocument, response];
        });
    };
    Documents.prototype.refresh = function (persistedDocument, requestOptions) {
        var _this = this;
        if (requestOptions === void 0) { requestOptions = {}; }
        var uri = this.getRequestURI(persistedDocument.id);
        this.setDefaultRequestOptions(requestOptions, NS.LDP.Class.RDFSource);
        return HTTP.Request.Service.head(uri, requestOptions).then(function (headerResponse) {
            var eTag = HTTP.Response.Util.getETag(headerResponse);
            if (eTag === persistedDocument._etag)
                return [persistedDocument, null];
            return HTTP.Request.Service.get(uri, requestOptions, new RDF.Document.Parser());
        }).then(function (_a) {
            var rdfDocuments = _a[0], response = _a[1];
            if (response === null)
                return [rdfDocuments, response];
            var eTag = HTTP.Response.Util.getETag(response);
            if (eTag === null)
                throw new HTTP.Errors.BadResponseError("The response doesn't contain an ETag", response);
            var rdfDocument = _this.getRDFDocument(uri, rdfDocuments, response);
            if (rdfDocument === null)
                throw new HTTP.Errors.BadResponseError("No document was returned.", response);
            var updatedPersistedDocument = _this._getPersistedDocument(rdfDocument, response);
            updatedPersistedDocument._etag = eTag;
            return [updatedPersistedDocument, response];
        });
    };
    Documents.prototype.saveAndRefresh = function (persistedDocument, requestOptions) {
        var _this = this;
        if (requestOptions === void 0) { requestOptions = {}; }
        var saveResponse;
        return this.save(persistedDocument).then(function (_a) {
            var document = _a[0], response = _a[1];
            saveResponse = response;
            return _this.refresh(persistedDocument);
        }).then(function (_a) {
            var document = _a[0], response = _a[1];
            return [persistedDocument, [saveResponse, response]];
        });
    };
    Documents.prototype.delete = function (documentURI, requestOptions) {
        var _this = this;
        if (requestOptions === void 0) { requestOptions = {}; }
        documentURI = this.getRequestURI(documentURI);
        this.setDefaultRequestOptions(requestOptions, NS.LDP.Class.RDFSource);
        return HTTP.Request.Service.delete(documentURI, requestOptions).then(function (response) {
            var pointerID = _this.getPointerID(documentURI);
            _this.pointers.delete(pointerID);
            return response;
        });
    };
    Documents.prototype.getDownloadURL = function (documentURI, requestOptions) {
        return this.context.auth.getAuthenticatedURL(documentURI, requestOptions);
    };
    Documents.prototype.getGeneralSchema = function () {
        if (!this.context)
            return new ObjectSchema.DigestedObjectSchema();
        var schema = ObjectSchema.Digester.combineDigestedObjectSchemas([this.context.getObjectSchema()]);
        if (this.context.hasSetting("vocabulary"))
            schema.vocab = this.context.resolve(this.context.getSetting("vocabulary"));
        return schema;
    };
    Documents.prototype.getSchemaFor = function (object) {
        var schema = ("@id" in object) ?
            this.getDigestedObjectSchemaForExpandedObject(object) :
            this.getDigestedObjectSchemaForDocument(object);
        return schema;
    };
    Documents.prototype.executeRawASKQuery = function (documentURI, askQuery, requestOptions) {
        if (requestOptions === void 0) { requestOptions = {}; }
        documentURI = this.getRequestURI(documentURI);
        if (this.context && this.context.auth.isAuthenticated())
            this.context.auth.addAuthentication(requestOptions);
        return SPARQL.Service.executeRawASKQuery(documentURI, askQuery, requestOptions);
    };
    Documents.prototype.executeASKQuery = function (documentURI, askQuery, requestOptions) {
        if (requestOptions === void 0) { requestOptions = {}; }
        documentURI = this.getRequestURI(documentURI);
        if (this.context && this.context.auth.isAuthenticated())
            this.context.auth.addAuthentication(requestOptions);
        return SPARQL.Service.executeASKQuery(documentURI, askQuery, requestOptions);
    };
    Documents.prototype.executeRawSELECTQuery = function (documentURI, selectQuery, requestOptions) {
        if (requestOptions === void 0) { requestOptions = {}; }
        documentURI = this.getRequestURI(documentURI);
        if (this.context && this.context.auth.isAuthenticated())
            this.context.auth.addAuthentication(requestOptions);
        return SPARQL.Service.executeRawSELECTQuery(documentURI, selectQuery, requestOptions);
    };
    Documents.prototype.executeSELECTQuery = function (documentURI, selectQuery, requestOptions) {
        if (requestOptions === void 0) { requestOptions = {}; }
        documentURI = this.getRequestURI(documentURI);
        if (this.context && this.context.auth.isAuthenticated())
            this.context.auth.addAuthentication(requestOptions);
        return SPARQL.Service.executeSELECTQuery(documentURI, selectQuery, this, requestOptions);
    };
    Documents.prototype.executeRawCONSTRUCTQuery = function (documentURI, constructQuery, requestOptions) {
        if (requestOptions === void 0) { requestOptions = {}; }
        documentURI = this.getRequestURI(documentURI);
        if (this.context && this.context.auth.isAuthenticated())
            this.context.auth.addAuthentication(requestOptions);
        return SPARQL.Service.executeRawCONSTRUCTQuery(documentURI, constructQuery, requestOptions);
    };
    Documents.prototype.executeRawDESCRIBEQuery = function (documentURI, describeQuery, requestOptions) {
        if (requestOptions === void 0) { requestOptions = {}; }
        documentURI = this.getRequestURI(documentURI);
        if (this.context && this.context.auth.isAuthenticated())
            this.context.auth.addAuthentication(requestOptions);
        return SPARQL.Service.executeRawDESCRIBEQuery(documentURI, describeQuery, requestOptions);
    };
    Documents.prototype.executeUPDATE = function (documentURI, update, requestOptions) {
        if (requestOptions === void 0) { requestOptions = {}; }
        if (!RDF.URI.Util.isAbsolute(documentURI)) {
            if (!this.context)
                throw new Errors.IllegalArgumentError("This Documents instance doesn't support relative URIs.");
            documentURI = this.context.resolve(documentURI);
        }
        if (this.context && this.context.auth.isAuthenticated())
            this.context.auth.addAuthentication(requestOptions);
        return SPARQL.Service.executeUPDATE(documentURI, update, requestOptions);
    };
    Documents.prototype._getPersistedDocument = function (rdfDocument, response) {
        var documentResource = this.getDocumentResource(rdfDocument, response);
        var fragmentResources = RDF.Document.Util.getBNodeResources(rdfDocument);
        fragmentResources = fragmentResources.concat(RDF.Document.Util.getFragmentResources(rdfDocument));
        var uri = documentResource["@id"];
        var documentPointer = this.getPointer(uri);
        if (documentPointer.isResolved()) {
            this.updatePersistedDocument(documentPointer, documentResource, fragmentResources);
        }
        else {
            this.createPersistedDocument(documentPointer, documentResource, fragmentResources);
        }
        return documentPointer;
    };
    Documents.prototype._getFreeResources = function (nodes) {
        var freeResourcesDocument = FreeResources.Factory.create(this);
        var resources = nodes.map(function (node) { return freeResourcesDocument.createResource(node["@id"]); });
        this.compact(nodes, resources, freeResourcesDocument);
        return freeResourcesDocument;
    };
    Documents.prototype.getRDFDocument = function (requestURL, rdfDocuments, response) {
        rdfDocuments = rdfDocuments.filter(function (rdfDocument) { return rdfDocument["@id"] === requestURL; });
        if (rdfDocuments.length > 1)
            throw new HTTP.Errors.BadResponseError("Several documents share the same id.", response);
        return rdfDocuments.length > 0 ? rdfDocuments[0] : null;
    };
    Documents.prototype.getDocumentResource = function (rdfDocument, response) {
        var documentResources = RDF.Document.Util.getDocumentResources(rdfDocument);
        if (documentResources.length === 0)
            throw new HTTP.Errors.BadResponseError("The RDFDocument: " + rdfDocument["@id"] + ", doesn't contain a document resource.", response);
        if (documentResources.length > 1)
            throw new HTTP.Errors.BadResponseError("The RDFDocument: " + rdfDocument["@id"] + ", contains more than one document resource.", response);
        return documentResources[0];
    };
    Documents.prototype.getPointerID = function (uri) {
        if (RDF.URI.Util.isBNodeID(uri))
            throw new Errors.IllegalArgumentError("BNodes cannot be fetched directly.");
        if (!!this.context) {
            if (RDF.URI.Util.isPrefixed(uri))
                uri = ObjectSchema.Digester.resolvePrefixedURI(uri, this.getGeneralSchema());
            if (!RDF.URI.Util.isRelative(uri)) {
                var baseURI = this.context.getBaseURI();
                if (!RDF.URI.Util.isBaseOf(baseURI, uri))
                    return null;
                return uri.substring(baseURI.length);
            }
            else {
                return uri[0] === "/" ? uri.substr(1) : uri;
            }
        }
        else {
            if (RDF.URI.Util.isRelative(uri))
                throw new Errors.IllegalArgumentError("This Documents instance doesn't support relative URIs.");
            if (RDF.URI.Util.isPrefixed(uri))
                throw new Errors.IllegalArgumentError("This Documents instance doesn't support prefixed URIs.");
            return uri;
        }
    };
    Documents.prototype.createPointer = function (localID) {
        return this.createPointerFrom({}, localID);
    };
    Documents.prototype.createPointerFrom = function (object, localID) {
        var _this = this;
        var id = !!this.context ? this.context.resolve(localID) : localID;
        var pointer = Pointer.Factory.createFrom(object, id);
        Object.defineProperty(pointer, "resolve", {
            writable: false,
            enumerable: false,
            configurable: true,
            value: function () {
                return _this.get(id);
            },
        });
        return pointer;
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
        var digestedSchema = this.getDigestedObjectSchemaForExpandedObject(expandedObject);
        return this.jsonldConverter.compact(expandedObject, targetObject, digestedSchema, pointerLibrary);
    };
    Documents.prototype.getDigestedObjectSchemaForExpandedObject = function (expandedObject) {
        var types = RDF.Node.Util.getTypes(expandedObject);
        return this.getDigestedObjectSchema(types, expandedObject["@id"]);
    };
    Documents.prototype.getDigestedObjectSchemaForDocument = function (document) {
        var types = Resource.Util.getTypes(document);
        return this.getDigestedObjectSchema(types, document.id);
    };
    Documents.prototype.getDigestedObjectSchema = function (objectTypes, objectID) {
        if (!this.context)
            return new ObjectSchema.DigestedObjectSchema();
        var objectSchemas = [this.context.getObjectSchema()];
        if (Utils.isDefined(objectID) && !RDF.URI.Util.hasFragment(objectID) && !RDF.URI.Util.isBNodeID(objectID))
            objectSchemas.push(Documents._documentSchema);
        for (var _i = 0, objectTypes_1 = objectTypes; _i < objectTypes_1.length; _i++) {
            var type = objectTypes_1[_i];
            if (this.context.hasObjectSchema(type))
                objectSchemas.push(this.context.getObjectSchema(type));
        }
        var digestedSchema = ObjectSchema.Digester.combineDigestedObjectSchemas(objectSchemas);
        if (this.context.hasSetting("vocabulary"))
            digestedSchema.vocab = this.context.resolve(this.context.getSetting("vocabulary"));
        return digestedSchema;
    };
    Documents.prototype.updateObject = function (target, source) {
        var keys = Utils.A.joinWithoutDuplicates(Object.keys(source), Object.keys(target));
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var key = keys_1[_i];
            if (Utils.hasProperty(source, key)) {
                target[key] = source[key];
            }
            else {
                delete target[key];
            }
        }
        return target;
    };
    Documents.prototype.getAssociatedFragment = function (blankNodes, namedFragments, searchedFragment) {
        if (!RDF.URI.Util.isBNodeID(searchedFragment["@id"]))
            return namedFragments.get(searchedFragment["@id"]);
        var bNodeIdentifier = RDF.Value.Util.getProperty(searchedFragment, NS.C.Predicate.bNodeIdentifier, null);
        for (var _i = 0, blankNodes_1 = blankNodes; _i < blankNodes_1.length; _i++) {
            var fragment = blankNodes_1[_i];
            if (!RDF.URI.Util.isBNodeID(fragment.id))
                continue;
            var persistedBlankNode = fragment;
            if (!!persistedBlankNode.bNodeIdentifier && persistedBlankNode.bNodeIdentifier === bNodeIdentifier)
                return fragment;
        }
        return null;
    };
    Documents.prototype.getRequestURI = function (uri) {
        if (RDF.URI.Util.isRelative(uri)) {
            if (!this.context)
                throw new Errors.IllegalArgumentError("This Documents instance doesn't support relative URIs.");
            uri = this.context.resolve(uri);
        }
        else if (RDF.URI.Util.isPrefixed(uri)) {
            if (!this.context)
                throw new Errors.IllegalArgumentError("This Documents instance doesn't support prefixed URIs.");
            uri = ObjectSchema.Digester.resolvePrefixedURI(uri, this.context.getObjectSchema());
            if (RDF.URI.Util.isPrefixed(uri))
                throw new Errors.IllegalArgumentError("The prefixed URI \"" + uri + "\" could not be resolved.");
        }
        return uri;
    };
    Documents.prototype.setDefaultRequestOptions = function (requestOptions, interactionModel) {
        if (this.context && this.context.auth.isAuthenticated())
            this.context.auth.addAuthentication(requestOptions);
        HTTP.Request.Util.setAcceptHeader("application/ld+json", requestOptions);
        HTTP.Request.Util.setPreferredInteractionModel(interactionModel, requestOptions);
    };
    Documents.prototype.getMembershipResource = function (documentResource, rdfDocuments, response) {
        var membershipResource;
        var membershipResourceURI = RDF.Node.Util.getPropertyURI(documentResource, NS.LDP.Predicate.membershipResource);
        if (documentResource["@id"] === membershipResourceURI) {
            membershipResource = documentResource;
        }
        else if (membershipResourceURI === null) {
            if (documentResource["@type"].indexOf(NS.LDP.Class.BasicContainer) !== -1) {
                membershipResource = documentResource;
            }
            else {
                throw new HTTP.Errors.BadResponseError("The document is not an ldp:BasicContainer and it doesn't contain an ldp:membershipResource triple.", response);
            }
        }
        else {
            var membershipResourceDocument = this.getRDFDocument(membershipResourceURI, rdfDocuments, response);
            if (membershipResourceDocument === null)
                return null;
            membershipResource = this.getDocumentResource(membershipResourceDocument, response);
        }
        return membershipResource;
    };
    Documents.prototype.createPersistedDocument = function (documentPointer, documentResource, fragmentResources) {
        var persistedDocument = PersistedDocument.Factory.decorate(documentPointer, this);
        var fragments = [];
        for (var _i = 0, fragmentResources_1 = fragmentResources; _i < fragmentResources_1.length; _i++) {
            var fragmentResource = fragmentResources_1[_i];
            fragments.push(persistedDocument.createFragment(fragmentResource["@id"]));
        }
        this.compact(documentResource, persistedDocument, persistedDocument);
        this.compact(fragmentResources, fragments, persistedDocument);
        persistedDocument._syncSnapshot();
        fragments.forEach(function (fragment) { return fragment._syncSnapshot(); });
        persistedDocument._syncSavedFragments();
        persistedDocument._resolved = true;
        if (Resource.Util.hasType(persistedDocument, ProtectedDocument.RDF_CLASS))
            PersistedProtectedDocument.Factory.decorate(persistedDocument);
        if (Resource.Util.hasType(persistedDocument, ACL.RDF_CLASS))
            PersistedACL.Factory.decorate(persistedDocument);
        return persistedDocument;
    };
    Documents.prototype.updatePersistedDocument = function (persistedDocument, documentResource, fragmentResources) {
        var namedFragmentsMap = new Map();
        var blankNodesArray = persistedDocument.getFragments().filter(function (fragment) {
            persistedDocument._removeFragment(fragment.id);
            if (RDF.URI.Util.isBNodeID(fragment.id))
                return true;
            namedFragmentsMap.set(fragment.id, fragment);
            return false;
        });
        var newFragments = [];
        for (var _i = 0, fragmentResources_2 = fragmentResources; _i < fragmentResources_2.length; _i++) {
            var fragmentResource = fragmentResources_2[_i];
            var fragment = this.getAssociatedFragment(blankNodesArray, namedFragmentsMap, fragmentResource);
            fragment = persistedDocument.createFragment(fragment || {}, fragmentResource["@id"]);
            newFragments.push([fragment, fragmentResource]);
        }
        for (var _a = 0, newFragments_1 = newFragments; _a < newFragments_1.length; _a++) {
            var _b = newFragments_1[_a], fragment = _b[0], resource = _b[1];
            this.updateObject(fragment, this.compact(resource, {}, persistedDocument));
            fragment._syncSnapshot();
        }
        persistedDocument._syncSavedFragments();
        this.updateObject(persistedDocument, this.compact(documentResource, {}, persistedDocument));
        persistedDocument._syncSnapshot();
        return persistedDocument;
    };
    Documents.prototype.getPersistedMetadataResources = function (freeNodes, rdfDocuments, response) {
        var _this = this;
        var freeResources = this._getFreeResources(freeNodes);
        var descriptionResources = freeResources.getResources().filter(LDP.ResponseMetadata.Factory.hasRDFClass);
        if (descriptionResources.length === 0)
            return [];
        if (descriptionResources.length > 1)
            throw new HTTP.Errors.BadResponseError("The response contained multiple " + LDP.ResponseMetadata.RDF_CLASS + " objects.", response);
        rdfDocuments.forEach(function (rdfDocument) { return _this._getPersistedDocument(rdfDocument, response); });
        var responseMetadata = descriptionResources[0];
        return responseMetadata.resourcesMetadata.map(function (resourceMetadata) {
            var resource = resourceMetadata.resource;
            resource._etag = resourceMetadata.eTag;
            return resource;
        });
    };
    Documents._documentSchema = ObjectSchema.Digester.digestSchema(Document.SCHEMA);
    return Documents;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Documents;

//# sourceMappingURL=Documents.js.map
