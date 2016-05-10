"use strict";
var Errors = require("./Errors");
var HTTP = require("./HTTP");
var RDF = require("./RDF");
var Utils = require("./Utils");
var Document = require("./Document");
var FreeResources = require("./FreeResources");
var JSONLDConverter = require("./JSONLDConverter");
var PersistedDocument = require("./PersistedDocument");
var Pointer = require("./Pointer");
var NS = require("./NS");
var ObjectSchema = require("./ObjectSchema");
var LDP = require("./LDP");
var SPARQL = require("./SPARQL");
var RetrievalPreferences = require("./RetrievalPreferences");
var ResponseDescription = require("./LDP/ResponseDescription");
var Documents = (function () {
    function Documents(context) {
        if (context === void 0) { context = null; }
        this.context = context;
        this.pointers = new Map();
        this.documentsBeingResolved = new Map();
        if (!!this.context && !!this.context.parentContext) {
            var contextJSONLDConverter = this.context.parentContext.documents.jsonldConverter;
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
        var id = Pointer.Factory.is(idOrPointer) ? idOrPointer.id : idOrPointer;
        if (RDF.URI.Util.isBNodeID(id))
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
            return this.context.parentContext.documents.inScope(id);
        return false;
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
        uri = this.setDataRequest(uri, requestOptions, false);
        if (this.pointers.has(pointerID)) {
            var pointer = this.getPointer(uri);
            if (pointer.isResolved()) {
                return this.refresh(pointer);
            }
        }
        if (this.documentsBeingResolved.has(pointerID))
            return this.documentsBeingResolved.get(pointerID);
        var promise = HTTP.Request.Service.get(uri, requestOptions, new RDF.Document.Parser()).then(function (_a) {
            var rdfDocuments = _a[0], response = _a[1];
            var eTag = HTTP.Response.Util.getETag(response);
            if (eTag === null)
                throw new HTTP.Errors.BadResponseError("The response doesn't contain an ETag", response);
            var rdfDocument = _this.getRDFDocument(uri, rdfDocuments, response);
            if (rdfDocument === null)
                throw new HTTP.Errors.BadResponseError("No document was returned.", response);
            var document = _this.getPersistedDocument(rdfDocument, response);
            document._etag = eTag;
            _this.documentsBeingResolved.delete(pointerID);
            return [document, response];
        });
        this.documentsBeingResolved.set(pointerID, promise);
        return promise;
    };
    Documents.prototype.exists = function (documentURI, requestOptions) {
        if (requestOptions === void 0) { requestOptions = {}; }
        documentURI = this.setDataRequest(documentURI, requestOptions, false);
        return HTTP.Request.Service.head(documentURI, requestOptions).then(function (response) { return [true, response]; }, function (error) {
            if (error.response.status === 404)
                return [false, error.response];
            return Promise.reject(error);
        });
    };
    Documents.prototype.createChild = function (parentURI, slugOrChildDocument, childDocumentOrRequestOptions, requestOptions) {
        var _this = this;
        if (childDocumentOrRequestOptions === void 0) { childDocumentOrRequestOptions = {}; }
        if (requestOptions === void 0) { requestOptions = {}; }
        var slug = Utils.isString(slugOrChildDocument) ? slugOrChildDocument : null;
        var childDocument = !Utils.isString(slugOrChildDocument) ? slugOrChildDocument : childDocumentOrRequestOptions;
        requestOptions = !Utils.isString(slugOrChildDocument) ? childDocumentOrRequestOptions : requestOptions;
        if (PersistedDocument.Factory.is(childDocument))
            return Promise.reject(new Errors.IllegalArgumentError("The childDocument provided has been already persisted."));
        if (!Document.Factory.is(childDocument))
            childDocument = Document.Factory.createFrom(childDocument);
        parentURI = this.setDataRequest(parentURI, requestOptions, true);
        if (childDocument.id) {
            var childURI = childDocument.id;
            if (!!this.context)
                childURI = this.context.resolve(childURI);
            if (!RDF.URI.Util.isBaseOf(parentURI, childURI)) {
                return Promise.reject(new Errors.IllegalArgumentError("The childDocument's URI is not relative to the parentURI specified"));
            }
        }
        var body = childDocument.toJSON(this, this.jsonldConverter);
        if (slug !== null)
            HTTP.Request.Util.setSlug(slug, requestOptions);
        return HTTP.Request.Service.post(parentURI, body, requestOptions).then(function (response) {
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
    Documents.prototype.listChildren = function (parentURI, requestOptions) {
        var _this = this;
        if (requestOptions === void 0) { requestOptions = {}; }
        parentURI = this.setDataRequest(parentURI, requestOptions, true);
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
            return [childPointers, response];
        });
    };
    Documents.prototype.getChildren = function (parentURI, retPrefReqOpt, requestOptions) {
        var retrievalPreferences = RetrievalPreferences.Factory.is(retPrefReqOpt) ? retPrefReqOpt : null;
        requestOptions = HTTP.Request.Util.isOptions(retPrefReqOpt) ? retPrefReqOpt : (HTTP.Request.Util.isOptions(requestOptions) ? requestOptions : {});
        parentURI = this.setDataRequest(parentURI, requestOptions, true);
        if (!!retrievalPreferences)
            parentURI += RetrievalPreferences.Util.stringifyRetrievalPreferences(retrievalPreferences);
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
        return this.sendRequestForResponseDescription(parentURI, requestOptions);
    };
    Documents.prototype.createAccessPoint = function (documentURIOrAccessPoint, accessPointOrSlug, slugOrRequestOptions, requestOptions) {
        var _this = this;
        if (slugOrRequestOptions === void 0) { slugOrRequestOptions = null; }
        if (requestOptions === void 0) { requestOptions = {}; }
        var documentURI = Utils.isString(documentURIOrAccessPoint) ? documentURIOrAccessPoint : null;
        var accessPoint = !Utils.isString(documentURIOrAccessPoint) ? documentURIOrAccessPoint : accessPointOrSlug;
        var slug = Utils.isString(accessPointOrSlug) ? accessPointOrSlug : slugOrRequestOptions;
        requestOptions = !Utils.isString(slugOrRequestOptions) && slugOrRequestOptions !== null ? slugOrRequestOptions : requestOptions;
        if (documentURI === null)
            documentURI = accessPoint.membershipResource.id;
        documentURI = this.setDataRequest(documentURI, requestOptions, true);
        if (accessPoint.membershipResource.id !== documentURI)
            return Promise.reject(new Errors.IllegalArgumentError("The documentURI must be the same as the accessPoint's membershipResource"));
        if (PersistedDocument.Factory.is(accessPoint))
            return Promise.reject(new Errors.IllegalArgumentError("The accessPoint provided has been already persisted."));
        if (accessPoint.id) {
            var childURI = accessPoint.id;
            if (!!this.context)
                childURI = this.context.resolve(childURI);
            if (!RDF.URI.Util.isBaseOf(documentURI, childURI)) {
                return Promise.reject(new Errors.IllegalArgumentError("The accessPoint's URI is not relative to the parentURI specified"));
            }
        }
        var body = accessPoint.toJSON(this, this.jsonldConverter);
        if (slug !== null)
            HTTP.Request.Util.setSlug(slug, requestOptions);
        return HTTP.Request.Service.post(documentURI, body, requestOptions).then(function (response) {
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
    Documents.prototype.upload = function (parentURI, slugOrData, dataOrRequestOptions, requestOptions) {
        var _this = this;
        if (dataOrRequestOptions === void 0) { dataOrRequestOptions = {}; }
        if (requestOptions === void 0) { requestOptions = {}; }
        var slug = Utils.isString(slugOrData) ? slugOrData : null;
        var data = !Utils.isString(slugOrData) ? slugOrData : dataOrRequestOptions;
        requestOptions = !Utils.isString(slugOrData) ? dataOrRequestOptions : requestOptions;
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
        parentURI = this.setDataRequest(parentURI, requestOptions, true);
        if (slug !== null)
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
        uri = this.setDataRequest(uri, requestOptions, true);
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
            var membershipResourceURI = RDF.Node.Util.getPropertyURI(documentResource, NS.LDP.Predicate.membershipResource);
            var membershipResource;
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
                var membershipResourceDocument = _this.getRDFDocument(membershipResourceURI, rdfDocuments, response);
                if (membershipResourceDocument === null)
                    throw new HTTP.Errors.BadResponseError("The membershipResource document was not included in the response.", response);
                membershipResource = _this.getDocumentResource(membershipResourceDocument, response);
            }
            var hasMemberRelation = RDF.Node.Util.getPropertyURI(documentResource, NS.LDP.Predicate.hasMemberRelation);
            var memberPointers = RDF.Value.Util.getPropertyPointers(membershipResource, hasMemberRelation, _this);
            return [memberPointers, response];
        });
    };
    Documents.prototype.getMembers = function (uri, nonReadRetPrefReqOpt, retPrefReqOpt, requestOptions) {
        var includeNonReadable = Utils.isBoolean(nonReadRetPrefReqOpt) ? nonReadRetPrefReqOpt : true;
        var retrievalPreferences = RetrievalPreferences.Factory.is(nonReadRetPrefReqOpt) ? nonReadRetPrefReqOpt : (RetrievalPreferences.Factory.is(retPrefReqOpt) ? retPrefReqOpt : null);
        requestOptions = HTTP.Request.Util.isOptions(nonReadRetPrefReqOpt) ? nonReadRetPrefReqOpt : (HTTP.Request.Util.isOptions(retPrefReqOpt) ? retPrefReqOpt : (HTTP.Request.Util.isOptions(requestOptions) ? requestOptions : {}));
        uri = this.setDataRequest(uri, requestOptions, true);
        if (!!retrievalPreferences)
            uri += RetrievalPreferences.Util.stringifyRetrievalPreferences(retrievalPreferences);
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
        return this.sendRequestForResponseDescription(uri, requestOptions);
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
                return Promise.reject(new Errors.IllegalArgumentError("No Carbon.Pointer or string URI provided."));
            pointers.push(member);
        }
        documentURI = this.setDataRequest(documentURI, requestOptions, true);
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
                return Promise.reject(new Errors.IllegalArgumentError("No Carbon.Pointer or string URI provided."));
            pointers.push(member);
        }
        documentURI = this.setDataRequest(documentURI, requestOptions, true);
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
        documentURI = this.setDataRequest(documentURI, requestOptions, true);
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
        var uri = this.setDataRequest(persistedDocument.id, requestOptions, false);
        HTTP.Request.Util.setIfMatchHeader(persistedDocument._etag, requestOptions);
        var body = persistedDocument.toJSON(this, this.jsonldConverter);
        return HTTP.Request.Service.put(uri, body, requestOptions).then(function (response) {
            return [persistedDocument, response];
        });
    };
    Documents.prototype.refresh = function (persistedDocument, requestOptions) {
        var _this = this;
        if (requestOptions === void 0) { requestOptions = {}; }
        var uri = this.setDataRequest(persistedDocument.id, requestOptions, false);
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
            var updatedPersistedDocument = _this.getPersistedDocument(rdfDocument, response);
            updatedPersistedDocument._etag = eTag;
            return [updatedPersistedDocument, response];
        });
    };
    Documents.prototype.delete = function (documentURI, requestOptions) {
        if (requestOptions === void 0) { requestOptions = {}; }
        documentURI = this.setDataRequest(documentURI, requestOptions, false);
        return HTTP.Request.Service.delete(documentURI, requestOptions);
    };
    Documents.prototype.getSchemaFor = function (object) {
        if ("@id" in object) {
            return this.getDigestedObjectSchemaForExpandedObject(object);
        }
        else {
            return this.getDigestedObjectSchemaForDocument(object);
        }
    };
    Documents.prototype.executeRawASKQuery = function (documentURI, askQuery, requestOptions) {
        if (requestOptions === void 0) { requestOptions = {}; }
        if (!RDF.URI.Util.isAbsolute(documentURI)) {
            if (!this.context)
                throw new Errors.IllegalArgumentError("This Documents instance doesn't support relative URIs.");
            documentURI = this.context.resolve(documentURI);
        }
        if (this.context && this.context.auth.isAuthenticated())
            this.context.auth.addAuthentication(requestOptions);
        return SPARQL.Service.executeRawASKQuery(documentURI, askQuery, requestOptions);
    };
    Documents.prototype.executeASKQuery = function (documentURI, askQuery, requestOptions) {
        if (requestOptions === void 0) { requestOptions = {}; }
        if (!RDF.URI.Util.isAbsolute(documentURI)) {
            if (!this.context)
                throw new Errors.IllegalArgumentError("This Documents instance doesn't support relative URIs.");
            documentURI = this.context.resolve(documentURI);
        }
        if (this.context && this.context.auth.isAuthenticated())
            this.context.auth.addAuthentication(requestOptions);
        return SPARQL.Service.executeASKQuery(documentURI, askQuery, requestOptions);
    };
    Documents.prototype.executeRawSELECTQuery = function (documentURI, selectQuery, requestOptions) {
        if (requestOptions === void 0) { requestOptions = {}; }
        if (!RDF.URI.Util.isAbsolute(documentURI)) {
            if (!this.context)
                throw new Errors.IllegalArgumentError("This Documents instance doesn't support relative URIs.");
            documentURI = this.context.resolve(documentURI);
        }
        if (this.context && this.context.auth.isAuthenticated())
            this.context.auth.addAuthentication(requestOptions);
        return SPARQL.Service.executeRawSELECTQuery(documentURI, selectQuery, requestOptions);
    };
    Documents.prototype.executeSELECTQuery = function (documentURI, selectQuery, requestOptions) {
        if (requestOptions === void 0) { requestOptions = {}; }
        if (!RDF.URI.Util.isAbsolute(documentURI)) {
            if (!this.context)
                throw new Errors.IllegalArgumentError("This Documents instance doesn't support relative URIs.");
            documentURI = this.context.resolve(documentURI);
        }
        if (this.context && this.context.auth.isAuthenticated())
            this.context.auth.addAuthentication(requestOptions);
        return SPARQL.Service.executeSELECTQuery(documentURI, selectQuery, this, requestOptions);
    };
    Documents.prototype.executeRawCONSTRUCTQuery = function (documentURI, constructQuery, requestOptions) {
        if (requestOptions === void 0) { requestOptions = {}; }
        if (!RDF.URI.Util.isAbsolute(documentURI)) {
            if (!this.context)
                throw new Errors.IllegalArgumentError("This Documents instance doesn't support relative URIs.");
            documentURI = this.context.resolve(documentURI);
        }
        if (this.context && this.context.auth.isAuthenticated())
            this.context.auth.addAuthentication(requestOptions);
        return SPARQL.Service.executeRawCONSTRUCTQuery(documentURI, constructQuery, requestOptions);
    };
    Documents.prototype.executeRawDESCRIBEQuery = function (documentURI, constructQuery, requestOptions) {
        if (requestOptions === void 0) { requestOptions = {}; }
        if (!RDF.URI.Util.isAbsolute(documentURI)) {
            if (!this.context)
                throw new Errors.IllegalArgumentError("This Documents instance doesn't support relative URIs.");
            documentURI = this.context.resolve(documentURI);
        }
        if (this.context && this.context.auth.isAuthenticated())
            this.context.auth.addAuthentication(requestOptions);
        return SPARQL.Service.executeRawDESCRIBEQuery(documentURI, constructQuery, requestOptions);
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
            if (!RDF.URI.Util.isRelative(uri)) {
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
        var _this = this;
        var id = !!this.context ? this.context.resolve(localID) : localID;
        var pointer = Pointer.Factory.create(id);
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
        return this.getDigestedObjectSchema(types);
    };
    Documents.prototype.getDigestedObjectSchemaForDocument = function (document) {
        var types = this.getDocumentTypes(document);
        return this.getDigestedObjectSchema(types);
    };
    Documents.prototype.getDigestedObjectSchema = function (objectTypes) {
        var digestedSchema;
        if (!!this.context) {
            var typesDigestedObjectSchemas = [this.context.getObjectSchema()];
            for (var _i = 0, objectTypes_1 = objectTypes; _i < objectTypes_1.length; _i++) {
                var type = objectTypes_1[_i];
                if (this.context.getObjectSchema(type))
                    typesDigestedObjectSchemas.push(this.context.getObjectSchema(type));
            }
            if (typesDigestedObjectSchemas.length > 1) {
                digestedSchema = ObjectSchema.Digester.combineDigestedObjectSchemas(typesDigestedObjectSchemas);
            }
            else {
                digestedSchema = typesDigestedObjectSchemas[0];
            }
        }
        else {
            digestedSchema = new ObjectSchema.DigestedObjectSchema();
        }
        return digestedSchema;
    };
    Documents.prototype.getDocumentTypes = function (document) {
        if (!document.types)
            return [];
        return document.types;
    };
    Documents.prototype.updateObject = function (target, source) {
        var keys = Array.from(new Set(Object.keys(source).concat(Object.keys(target))));
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
    Documents.prototype.getAssociatedFragment = function (persistedDocument, fragment) {
        if (RDF.URI.Util.isBNodeID(fragment.id)) {
            var blankNode = fragment;
            var fragments = persistedDocument.getFragments();
            for (var _i = 0, fragments_1 = fragments; _i < fragments_1.length; _i++) {
                var frag = fragments_1[_i];
                if (RDF.URI.Util.isBNodeID(frag.id) && frag.bNodeIdentifier === blankNode.bNodeIdentifier) {
                    return frag;
                }
            }
            persistedDocument.removeFragment(fragment.id);
            return null;
        }
        return persistedDocument.getFragment(fragment.id);
    };
    Documents.prototype.setDataRequest = function (uri, requestOptions, asContainer) {
        if (RDF.URI.Util.isRelative(uri) && !this.context)
            throw new Errors.IllegalArgumentError("This Documents instance doesn't support relative URIs.");
        if (this.context) {
            if (this.context.auth.isAuthenticated())
                this.context.auth.addAuthentication(requestOptions);
            uri = this.context.resolve(uri);
        }
        HTTP.Request.Util.setContentTypeHeader("application/ld+json", requestOptions);
        HTTP.Request.Util.setAcceptHeader("application/ld+json", requestOptions);
        var interactionModel = asContainer ? NS.LDP.Class.Container : NS.LDP.Class.RDFSource;
        HTTP.Request.Util.setPreferredInteractionModel(interactionModel, requestOptions);
        return uri;
    };
    Documents.prototype.getPersistedDocument = function (rdfDocument, response) {
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
    Documents.prototype.createPersistedDocument = function (documentPointer, documentResource, fragmentResources) {
        var document = PersistedDocument.Factory.createFrom(documentPointer, documentPointer.id, this);
        var fragments = [];
        for (var _i = 0, fragmentResources_1 = fragmentResources; _i < fragmentResources_1.length; _i++) {
            var fragmentResource = fragmentResources_1[_i];
            fragments.push(document.createFragment(fragmentResource["@id"]));
        }
        this.compact(documentResource, document, document);
        this.compact(fragmentResources, fragments, document);
        document._syncSnapshot();
        fragments.forEach(function (fragment) { return fragment._syncSnapshot(); });
        document._syncSavedFragments();
        document._resolved = true;
        if (LDP.Container.Factory.hasRDFClass(document))
            LDP.PersistedContainer.Factory.decorate(document);
        return document;
    };
    Documents.prototype.updatePersistedDocument = function (persistedDocument, documentResource, fragmentResources) {
        var originalFragments = persistedDocument.getFragments();
        var setFragments = new Set(originalFragments.map(function (fragment) { return fragment.id; }));
        var updatedData;
        for (var _i = 0, fragmentResources_2 = fragmentResources; _i < fragmentResources_2.length; _i++) {
            var fragmentResource = fragmentResources_2[_i];
            updatedData = this.compact(fragmentResource, {}, persistedDocument);
            var fragment = this.getAssociatedFragment(persistedDocument, updatedData);
            if (fragment) {
                fragment = this.updateObject(fragment, updatedData);
                if (!persistedDocument.hasFragment(fragment.id)) {
                    persistedDocument.createFragment(fragment.id, fragment);
                }
            }
            else {
                fragment = persistedDocument.createFragment(updatedData.id, updatedData);
            }
            setFragments.delete(fragment.id);
            fragment._syncSnapshot();
        }
        Array.from(setFragments).forEach(function (id) { return persistedDocument.removeFragment(id); });
        persistedDocument._syncSavedFragments();
        updatedData = this.compact(documentResource, {}, persistedDocument);
        this.updateObject(persistedDocument, updatedData);
        persistedDocument._syncSnapshot();
        return persistedDocument;
    };
    Documents.prototype.sendRequestForResponseDescription = function (uri, requestOptions) {
        var _this = this;
        return HTTP.Request.Service.get(uri, requestOptions, new HTTP.JSONLDParser.Class()).then(function (_a) {
            var expandedResult = _a[0], response = _a[1];
            var freeNodes = RDF.Node.Util.getFreeNodes(expandedResult);
            var rdfDocuments = RDF.Document.Util.getDocuments(expandedResult);
            rdfDocuments.forEach(function (rdfDocument) { return _this.getPersistedDocument(rdfDocument, response); });
            var freeResources = _this.getFreeResourcesDocument(freeNodes);
            var descriptionResources = freeResources.getResources().filter(function (resource) { return ResponseDescription.Factory.hasRDFClass(resource); });
            if (descriptionResources.length === 0)
                return [[], response];
            if (descriptionResources.length > 1)
                throw new HTTP.Errors.BadResponseError("The response contained multiple c:ResponseDescription objects", response);
            var responseDescription = descriptionResources[0];
            for (var _i = 0, _b = responseDescription.responseProperties; _i < _b.length; _i++) {
                var responseMetaData = _b[_i];
                var document_1 = responseMetaData.responsePropertyResource;
                document_1._etag = responseMetaData.eTag;
            }
            var persistedDocuments = responseDescription.responseProperties.map(function (responseMetaData) { return responseMetaData.responsePropertyResource; });
            return [persistedDocuments, response];
        });
    };
    Documents.prototype.getFreeResourcesDocument = function (nodes) {
        var freeResourcesDocument = FreeResources.Factory.create(this);
        var resources = nodes.map(function (node) { return freeResourcesDocument.createResource(node["@id"]); });
        this.compact(nodes, resources, freeResourcesDocument);
        return freeResourcesDocument;
    };
    return Documents;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Documents;

//# sourceMappingURL=Documents.js.map
