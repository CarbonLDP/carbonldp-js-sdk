"use strict";
var Errors = require("./Errors");
var HTTP = require("./HTTP");
var RDF = require("./RDF");
var Utils = require("./Utils");
var Document = require("./Document");
var JSONLDConverter = require("./JSONLDConverter");
var PersistedDocument = require("./PersistedDocument");
var Pointer = require("./Pointer");
var NS = require("./NS");
var ObjectSchema = require("./ObjectSchema");
var LDP = require("./LDP");
var SPARQL = require("./SPARQL");
var Documents = (function () {
    function Documents(context) {
        if (context === void 0) { context = null; }
        this.context = context;
        this.pointers = new Map();
        this._inProgress = new Map();
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
        if (!localID) {
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
        if (!!this.context)
            uri = this.context.resolve(uri);
        if (this.pointers.has(pointerID)) {
            var pointer_1 = this.getPointer(uri);
            if (pointer_1.isResolved()) {
                return new Promise(function (resolve, reject) {
                    resolve([pointer_1, null]);
                });
            }
        }
        if (this.context && this.context.auth.isAuthenticated())
            this.context.auth.addAuthentication(requestOptions);
        HTTP.Request.Util.setAcceptHeader("application/ld+json", requestOptions);
        HTTP.Request.Util.setPreferredInteractionModel(NS.LDP.Class.RDFSource, requestOptions);
        if (this._inProgress.has(pointerID))
            return this._inProgress.get(pointerID);
        var promise = HTTP.Request.Service.get(uri, requestOptions, new RDF.Document.Parser()).then(function (_a) {
            var rdfDocuments = _a[0], response = _a[1];
            var etag = HTTP.Response.Util.getETag(response);
            if (etag === null)
                throw new HTTP.Errors.BadResponseError("The response doesn't contain an ETag", response);
            var rdfDocument = _this.getRDFDocument(uri, rdfDocuments, response);
            if (rdfDocument === null)
                throw new HTTP.Errors.BadResponseError("No document was returned.", response);
            var documentResources = RDF.Document.Util.getDocumentResources(rdfDocument);
            if (documentResources.length > 1)
                throw new HTTP.Errors.BadResponseError("The RDFDocument contains more than one document resource.", response);
            if (documentResources.length === 0)
                throw new HTTP.Errors.BadResponseError("The RDFDocument doesn\'t contain a document resource.", response);
            var documentResource = documentResources[0];
            var fragmentResources = RDF.Document.Util.getBNodeResources(rdfDocument);
            var namedFragmentResources = RDF.Document.Util.getFragmentResources(rdfDocument);
            var documentPointer = _this.getPointer(uri);
            documentPointer._resolved = true;
            var document = PersistedDocument.Factory.createFrom(documentPointer, uri, _this);
            document._etag = etag;
            var fragments = [];
            for (var _i = 0, fragmentResources_1 = fragmentResources; _i < fragmentResources_1.length; _i++) {
                var fragmentResource = fragmentResources_1[_i];
                fragments.push(document.createFragment(fragmentResource["@id"]));
            }
            var namedFragments = [];
            for (var _b = 0, namedFragmentResources_1 = namedFragmentResources; _b < namedFragmentResources_1.length; _b++) {
                var namedFragmentResource = namedFragmentResources_1[_b];
                namedFragments.push(document.createNamedFragment(namedFragmentResource["@id"]));
            }
            _this.compact(documentResource, document, document);
            _this.compact(fragmentResources, fragments, document);
            _this.compact(namedFragmentResources, namedFragments, document);
            document._syncSnapshot();
            fragments.forEach(function (fragment) { return fragment._syncSnapshot(); });
            namedFragments.forEach(function (fragment) { return fragment._syncSnapshot(); });
            document._syncSavedFragments();
            if (LDP.Container.Factory.hasRDFClass(document))
                LDP.PersistedContainer.Factory.decorate(document);
            _this._inProgress.delete(pointerID);
            return [document, response];
        });
        this._inProgress.set(pointerID, promise);
        return promise;
    };
    Documents.prototype.exists = function (documentURI, requestOptions) {
        if (requestOptions === void 0) { requestOptions = {}; }
        if (!!this.context) {
            documentURI = this.context.resolve(documentURI);
            if (this.context.auth.isAuthenticated())
                this.context.auth.addAuthentication(requestOptions);
        }
        HTTP.Request.Util.setAcceptHeader("application/ld+json", requestOptions);
        HTTP.Request.Util.setPreferredInteractionModel(NS.LDP.Class.RDFSource, requestOptions);
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
        if (!Document.Factory.is(childDocument))
            childDocument = Document.Factory.createFrom(childDocument);
        if (!!this.context)
            parentURI = this.context.resolve(parentURI);
        if (PersistedDocument.Factory.is(childDocument))
            return Promise.reject(new Errors.IllegalArgumentError("The childDocument provided has been already persisted."));
        if (childDocument.id) {
            var childURI = childDocument.id;
            if (!!this.context)
                childURI = this.context.resolve(childURI);
            if (!RDF.URI.Util.isBaseOf(parentURI, childURI)) {
                return Promise.reject(new Errors.IllegalArgumentError("The childDocument's URI is not relative to the parentURI specified"));
            }
        }
        if (this.context && this.context.auth.isAuthenticated())
            this.context.auth.addAuthentication(requestOptions);
        HTTP.Request.Util.setContentTypeHeader("application/ld+json", requestOptions);
        HTTP.Request.Util.setAcceptHeader("application/ld+json", requestOptions);
        HTTP.Request.Util.setPreferredInteractionModel(NS.LDP.Class.Container, requestOptions);
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
    Documents.prototype.getChildren = function (parentURI, requestOptions) {
        var _this = this;
        if (requestOptions === void 0) { requestOptions = {}; }
        if (!!this.context)
            parentURI = this.context.resolve(parentURI);
        if (this.context && this.context.auth.isAuthenticated())
            this.context.auth.addAuthentication(requestOptions);
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
        HTTP.Request.Util.setContentTypeHeader("application/ld+json", requestOptions);
        HTTP.Request.Util.setAcceptHeader("application/ld+json", requestOptions);
        HTTP.Request.Util.setPreferredInteractionModel(NS.LDP.Class.Container, requestOptions);
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
        if (!!this.context)
            documentURI = this.context.resolve(documentURI);
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
        if (this.context && this.context.auth.isAuthenticated())
            this.context.auth.addAuthentication(requestOptions);
        HTTP.Request.Util.setContentTypeHeader("application/ld+json", requestOptions);
        HTTP.Request.Util.setAcceptHeader("application/ld+json", requestOptions);
        HTTP.Request.Util.setPreferredInteractionModel(NS.LDP.Class.RDFSource, requestOptions);
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
    Documents.prototype.upload = function (parentURI, slugOrBlob, blobOrRequestOptions, requestOptions) {
        var _this = this;
        if (blobOrRequestOptions === void 0) { blobOrRequestOptions = {}; }
        if (requestOptions === void 0) { requestOptions = {}; }
        var slug = Utils.isString(slugOrBlob) ? slugOrBlob : null;
        var blob = !Utils.isString(slugOrBlob) ? slugOrBlob : blobOrRequestOptions;
        requestOptions = !Utils.isString(slugOrBlob) ? blobOrRequestOptions : requestOptions;
        if (!(blob instanceof Blob))
            return Promise.reject(new Errors.IllegalArgumentError("The file is not a valid Blob object."));
        if (!!this.context)
            parentURI = this.context.resolve(parentURI);
        if (this.context && this.context.auth.isAuthenticated())
            this.context.auth.addAuthentication(requestOptions);
        HTTP.Request.Util.setContentTypeHeader(blob.type, requestOptions);
        HTTP.Request.Util.setAcceptHeader("application/ld+json", requestOptions);
        HTTP.Request.Util.setPreferredInteractionModel(NS.LDP.Class.Container, requestOptions);
        if (slug !== null)
            HTTP.Request.Util.setSlug(slug, requestOptions);
        return HTTP.Request.Service.post(parentURI, blob, requestOptions).then(function (response) {
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
    Documents.prototype.getMembers = function (uri, includeNonReadableOrRequestOptions, requestOptions) {
        var _this = this;
        if (includeNonReadableOrRequestOptions === void 0) { includeNonReadableOrRequestOptions = null; }
        if (requestOptions === void 0) { requestOptions = {}; }
        var includeNonReadable = Utils.isBoolean(includeNonReadableOrRequestOptions) ? includeNonReadableOrRequestOptions : true;
        requestOptions = Utils.isObject(includeNonReadableOrRequestOptions) && includeNonReadableOrRequestOptions !== null ? includeNonReadableOrRequestOptions : requestOptions;
        if (!RDF.URI.Util.isAbsolute(uri)) {
            if (!this.context)
                throw new Errors.IllegalArgumentError("This Documents instance doesn't support relative URIs.");
            uri = this.context.resolve(uri);
        }
        if (this.context && this.context.auth.isAuthenticated())
            this.context.auth.addAuthentication(requestOptions);
        HTTP.Request.Util.setAcceptHeader("application/ld+json", requestOptions);
        HTTP.Request.Util.setPreferredInteractionModel(NS.LDP.Class.Container, requestOptions);
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
        if (!!this.context)
            documentURI = this.context.resolve(documentURI);
        var document = LDP.AddMemberAction.Factory.createDocument(pointers);
        if (this.context && this.context.auth.isAuthenticated())
            this.context.auth.addAuthentication(requestOptions);
        HTTP.Request.Util.setAcceptHeader("application/ld+json", requestOptions);
        HTTP.Request.Util.setContentTypeHeader("application/ld+json", requestOptions);
        HTTP.Request.Util.setPreferredInteractionModel(NS.LDP.Class.Container, requestOptions);
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
        if (!!this.context)
            documentURI = this.context.resolve(documentURI);
        var document = LDP.RemoveMemberAction.Factory.createDocument(pointers);
        var containerRetrievalPreferences = {
            include: [NS.C.Class.PreferSelectedMembershipTriples],
            omit: [NS.C.Class.PreferMembershipTriples],
        };
        if (this.context && this.context.auth.isAuthenticated())
            this.context.auth.addAuthentication(requestOptions);
        HTTP.Request.Util.setAcceptHeader("application/ld+json", requestOptions);
        HTTP.Request.Util.setContentTypeHeader("application/ld+json", requestOptions);
        HTTP.Request.Util.setPreferredInteractionModel(NS.LDP.Class.Container, requestOptions);
        HTTP.Request.Util.setContainerRetrievalPreferences(containerRetrievalPreferences, requestOptions, false);
        var body = document.toJSON(this, this.jsonldConverter);
        return HTTP.Request.Service.delete(documentURI, body, requestOptions);
    };
    Documents.prototype.removeAllMembers = function (documentURI, requestOptions) {
        if (requestOptions === void 0) { requestOptions = {}; }
        if (!!this.context)
            documentURI = this.context.resolve(documentURI);
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
        if (this.context && this.context.auth.isAuthenticated())
            this.context.auth.addAuthentication(requestOptions);
        HTTP.Request.Util.setAcceptHeader("application/ld+json", requestOptions);
        HTTP.Request.Util.setContentTypeHeader("application/ld+json", requestOptions);
        HTTP.Request.Util.setPreferredInteractionModel(NS.LDP.Class.Container, requestOptions);
        HTTP.Request.Util.setContainerRetrievalPreferences(containerRetrievalPreferences, requestOptions, false);
        return HTTP.Request.Service.delete(documentURI, requestOptions);
    };
    Documents.prototype.save = function (persistedDocument, requestOptions) {
        if (requestOptions === void 0) { requestOptions = {}; }
        if (this.context && this.context.auth.isAuthenticated())
            this.context.auth.addAuthentication(requestOptions);
        HTTP.Request.Util.setAcceptHeader("application/ld+json", requestOptions);
        HTTP.Request.Util.setContentTypeHeader("application/ld+json", requestOptions);
        HTTP.Request.Util.setPreferredInteractionModel(NS.LDP.Class.RDFSource, requestOptions);
        HTTP.Request.Util.setIfMatchHeader(persistedDocument._etag, requestOptions);
        var body = persistedDocument.toJSON(this, this.jsonldConverter);
        return HTTP.Request.Service.put(persistedDocument.id, body, requestOptions).then(function (response) {
            return [persistedDocument, response];
        });
    };
    Documents.prototype.delete = function (documentURI, requestOptions) {
        if (requestOptions === void 0) { requestOptions = {}; }
        if (this.context && this.context.auth.isAuthenticated())
            this.context.auth.addAuthentication(requestOptions);
        if (!!this.context)
            documentURI = this.context.resolve(documentURI);
        HTTP.Request.Util.setAcceptHeader("application/ld+json", requestOptions);
        HTTP.Request.Util.setPreferredInteractionModel(NS.LDP.Class.RDFSource, requestOptions);
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
        var types = this.getExpandedObjectTypes(expandedObject);
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
    Documents.prototype.getExpandedObjectTypes = function (expandedObject) {
        if (!expandedObject["@type"])
            return [];
        return expandedObject["@type"];
    };
    Documents.prototype.getDocumentTypes = function (document) {
        if (!document.types)
            return [];
        return document.types;
    };
    return Documents;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Documents;

//# sourceMappingURL=Documents.js.map
