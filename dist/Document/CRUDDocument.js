"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AccessPoint_1 = require("../AccessPoint");
var core_1 = require("../core");
var Errors_1 = require("../Errors");
var Fragment_1 = require("../Fragment");
var HTTP_1 = require("../HTTP");
var Errors_2 = require("../HTTP/Errors");
var JSONLD_1 = require("../JSONLD");
var LDP_1 = require("../LDP");
var LDPatch_1 = require("../LDPatch");
var ProtectedDocument_1 = require("../ProtectedDocument");
var RDF_1 = require("../RDF");
var Resource_1 = require("../Resource");
var Utils_1 = require("../Utils");
var Vocabularies_1 = require("../Vocabularies");
var BasePersistedDocument_1 = require("./BasePersistedDocument");
var TransientDocument_1 = require("./TransientDocument");
function getTargetID(uri, response) {
    var locationHeader = response.getHeader("Content-Location");
    if (!locationHeader)
        return uri;
    if (locationHeader.values.length !== 1)
        throw new Errors_2.BadResponseError("The response must contain one Content-Location header.", response);
    var locationString = "" + locationHeader;
    if (!locationString)
        throw new Errors_2.BadResponseError("The response doesn't contain a valid 'Content-Location' header.", response);
    return locationString;
}
function parseRDFDocument(registry, rdfDocument, eTag) {
    var resource = new JSONLD_1.JSONLDCompacter(registry)
        .compactDocument(rdfDocument);
    resource._eTag = eTag;
    resource._resolved = true;
    return resource;
}
function addAuthentication(registry, requestOptions) {
    if (!registry.context || !registry.context.auth)
        return;
    registry.context.auth.addAuthentication(requestOptions);
}
function setDefaultRequestOptions(registry, requestOptions, interactionModel) {
    addAuthentication(registry, requestOptions);
    if (interactionModel)
        HTTP_1.RequestUtils.setPreferredInteractionModel(interactionModel, requestOptions);
    HTTP_1.RequestUtils.setAcceptHeader("application/ld+json", requestOptions);
    return requestOptions;
}
function getRegistry(repository) {
    if (repository._registry)
        return repository._registry;
    throw new Errors_1.IllegalActionError("\"" + repository.id + "\" doesn't support CRUD requests.");
}
function getFullResource(registry, uri, requestOptions) {
    if (registry.hasPointer(uri)) {
        var resource = registry.getPointer(uri);
        if (resource.isResolved()) {
            if (!requestOptions.ensureLatest)
                return resource;
            HTTP_1.RequestUtils.setIfNoneMatchHeader(resource._eTag, requestOptions);
        }
    }
    setDefaultRequestOptions(registry, requestOptions, Vocabularies_1.LDP.RDFSource);
    return HTTP_1.RequestService
        .get(uri, requestOptions, new RDF_1.RDFDocumentParser())
        .then(function (_a) {
        var rdfDocuments = _a[0], response = _a[1];
        uri = getTargetID(uri, response);
        var rdfDocument = rdfDocuments.find(function (node) { return node["@id"] === uri; });
        if (!rdfDocument)
            throw new Errors_2.BadResponseError("No document was returned.", response);
        var eTag = response.getETag();
        return parseRDFDocument(registry, rdfDocument, eTag);
    })
        .catch(registry._parseFailedResponse.bind(registry));
}
function applyResponseMetadata(registry, freeNodes) {
    if (!freeNodes.length)
        return;
    var freeResources = registry._parseFreeNodes(freeNodes);
    var responseMetadata = freeResources.getPointers().find(LDP_1.ResponseMetadata.is);
    for (var _i = 0, _a = responseMetadata.documentsMetadata; _i < _a.length; _i++) {
        var documentMetadata = _a[_i];
        var resource = documentMetadata.relatedDocument;
        for (var _b = 0, _c = documentMetadata.bNodesMap.entries; _b < _c.length; _b++) {
            var _d = _c[_b], entryKey = _d.entryKey, entryValue = _d.entryValue;
            var originalBNode = resource.getPointer(entryKey.id, true);
            resource.removePointer(entryKey.id);
            originalBNode.id = entryValue.id;
            resource._register(originalBNode);
        }
    }
}
function applyResponseRepresentation(registry, resource, response) {
    if (response.status === 204 || !response.data)
        return resource;
    return new JSONLD_1.JSONLDParser()
        .parse(response.data)
        .then(function (expandedResult) {
        var freeNodes = RDF_1.RDFNode.getFreeNodes(expandedResult);
        applyResponseMetadata(registry, freeNodes);
        var preferenceHeader = response.getHeader("Preference-Applied");
        if (preferenceHeader === null || preferenceHeader.toString() !== "return=representation")
            return resource;
        var rdfDocument = RDF_1.RDFDocument
            .getDocuments(expandedResult)
            .find(function (node) { return node["@id"] === resource.id; });
        if (!rdfDocument)
            throw new Errors_2.BadResponseError("No document was returned.", response);
        return parseRDFDocument(registry, rdfDocument, response.getETag());
    });
}
function persistResource(registry, parentURI, slug, resource, requestOptions) {
    HTTP_1.RequestUtils.setContentTypeHeader("application/ld+json", requestOptions);
    if (resource.id && !RDF_1.URI.isBaseOf(parentURI, resource.id)) {
        return Promise.reject(new Errors_1.IllegalArgumentError("The document's URI is not relative to the parentURI specified"));
    }
    if (resource["__CarbonLDP_persisting__"])
        return Promise.reject(new Errors_1.IllegalArgumentError("The document is already being persisted."));
    Object.defineProperty(resource, "__CarbonLDP_persisting__", { configurable: true, enumerable: false, writable: false, value: true });
    resource._registry = registry;
    var body = JSON.stringify(resource);
    if (!!slug)
        HTTP_1.RequestUtils.setSlug(slug, requestOptions);
    return HTTP_1.RequestService
        .post(parentURI, body, requestOptions)
        .then(function (response) {
        delete resource["__CarbonLDP_persisting__"];
        var locationHeader = response.getHeader("Location");
        if (locationHeader === null || locationHeader.values.length < 1)
            throw new Errors_2.BadResponseError("The response is missing a Location header.", response);
        if (locationHeader.values.length !== 1)
            throw new Errors_2.BadResponseError("The response contains more than one Location header.", response);
        resource.id = locationHeader.values[0].toString();
        registry._register(resource);
        var persistedDocument = ProtectedDocument_1.ProtectedDocument
            .decorate(resource);
        persistedDocument
            .getFragments()
            .forEach(Fragment_1.Fragment.decorate);
        return applyResponseRepresentation(registry, persistedDocument, response);
    })
        .catch(function (error) {
        delete resource["__CarbonLDP_persisting__"];
        return registry._parseFailedResponse(error);
    });
}
function persistChild(registry, parentURI, requestOptions, child, slug) {
    if (Resource_1.PersistedResource.is(child))
        throw new Errors_1.IllegalArgumentError("The child provided has already been persisted.");
    var childDocument;
    if (TransientDocument_1.TransientDocument.is(child)) {
        childDocument = child;
        childDocument._normalize();
    }
    else {
        if (!child)
            child = {};
        childDocument = TransientDocument_1.TransientDocument.createFrom(child);
    }
    setDefaultRequestOptions(registry, requestOptions, Vocabularies_1.LDP.Container);
    return persistResource(registry, parentURI, slug, childDocument, requestOptions);
}
function createChildren(retrievalType, repository, uriOrChildren, childrenOrSlugsOrOptions, slugsOrOptions, requestOptions) {
    return Utils_1.promiseMethod(function () {
        var registry = getRegistry(repository);
        requestOptions = HTTP_1.RequestUtils.isOptions(childrenOrSlugsOrOptions) ?
            childrenOrSlugsOrOptions :
            HTTP_1.RequestUtils.isOptions(slugsOrOptions) ?
                slugsOrOptions :
                requestOptions ? requestOptions : {};
        var uri = Utils_1.isString(uriOrChildren) ? uriOrChildren : void 0;
        var url = HTTP_1.RequestUtils.getRequestURLFor(registry, repository, uri);
        var slugs = Utils_1.isString(childrenOrSlugsOrOptions) ?
            childrenOrSlugsOrOptions :
            Utils_1.isString(slugsOrOptions) || Array.isArray(slugsOrOptions) ?
                slugsOrOptions :
                Array.isArray(childrenOrSlugsOrOptions) && Array.isArray(uriOrChildren) ?
                    childrenOrSlugsOrOptions :
                    null;
        var children = Array.isArray(uriOrChildren) || Utils_1.isObject(uriOrChildren) ?
            uriOrChildren :
            childrenOrSlugsOrOptions;
        HTTP_1.RequestUtils.setPreferredRetrieval(retrievalType, requestOptions);
        if (!Array.isArray(slugs) && !Array.isArray(children))
            return persistChild(registry, url, requestOptions, children, slugs);
        var slugsLength = Array.isArray(slugs) ? slugs.length : 0;
        var childrenLength = Array.isArray(children) ? children.length : 0;
        var total = Math.max(slugsLength, childrenLength);
        var promises = Array(total);
        for (var index = 0; index < total; ++index) {
            var cloneOptions = HTTP_1.RequestUtils.cloneOptions(requestOptions);
            var child = index < childrenLength ? children[index] : void 0;
            var slug = index < slugsLength ? slugs[index] : void 0;
            promises[index] = persistChild(registry, url, cloneOptions, child, slug);
        }
        return Promise.all(promises);
    });
}
function persistAccessPoint(registry, documentURI, requestOptions, accessPoint, slug) {
    if (Resource_1.PersistedResource.is(accessPoint))
        throw new Errors_1.IllegalArgumentError("The access-point provided has already been persisted.");
    var accessPointDocument;
    if (AccessPoint_1.TransientAccessPoint.is(accessPoint)) {
        accessPointDocument = accessPoint;
        accessPointDocument._normalize();
    }
    else {
        accessPointDocument = AccessPoint_1.TransientAccessPoint.createFrom(accessPoint);
    }
    if (!accessPointDocument.membershipResource)
        accessPointDocument.membershipResource = registry.getPointer(documentURI);
    else if (accessPointDocument.membershipResource.id !== documentURI)
        throw new Errors_1.IllegalArgumentError("The endpoint URI must be the same as the accessPoint's membershipResource.");
    setDefaultRequestOptions(registry, requestOptions, Vocabularies_1.LDP.RDFSource);
    return persistResource(registry, documentURI, slug, accessPointDocument, requestOptions);
}
function createAccessPoint(retrievalType, repository, uriOrAccessPoint, accessPointOrSlugOrRequestOptions, slugOrRequestOptions, requestOptions) {
    if (requestOptions === void 0) { requestOptions = {}; }
    return Utils_1.promiseMethod(function () {
        var registry = getRegistry(repository);
        var uri = Utils_1.isString(uriOrAccessPoint) ? uriOrAccessPoint : void 0;
        var url = HTTP_1.RequestUtils.getRequestURLFor(registry, repository, uri);
        var accessPoint = Utils_1.isObject(uriOrAccessPoint) ? uriOrAccessPoint :
            accessPointOrSlugOrRequestOptions;
        var slug = Utils_1.isString(accessPointOrSlugOrRequestOptions) ? accessPointOrSlugOrRequestOptions :
            Utils_1.isString(slugOrRequestOptions) ? slugOrRequestOptions : void 0;
        requestOptions = HTTP_1.RequestUtils.isOptions(accessPointOrSlugOrRequestOptions) ? accessPointOrSlugOrRequestOptions :
            Utils_1.isObject(slugOrRequestOptions) ? slugOrRequestOptions : requestOptions;
        HTTP_1.RequestUtils.setPreferredRetrieval(retrievalType, requestOptions);
        return persistAccessPoint(registry, url, requestOptions, accessPoint, slug);
    });
}
function createAccessPoints(retrievalType, repository, uriOrAccessPoints, accessPointOrSlugsOrRequestOptions, slugsOrRequestOptions, requestOptions) {
    if (requestOptions === void 0) { requestOptions = {}; }
    return Utils_1.promiseMethod(function () {
        var registry = getRegistry(repository);
        var uri = Utils_1.isString(uriOrAccessPoints) ? uriOrAccessPoints : void 0;
        var url = HTTP_1.RequestUtils.getRequestURLFor(registry, repository, uri);
        var accessPoints = Array.isArray(uriOrAccessPoints) ? uriOrAccessPoints :
            accessPointOrSlugsOrRequestOptions;
        var slugs = Array.isArray(accessPointOrSlugsOrRequestOptions) && accessPointOrSlugsOrRequestOptions !== accessPoints ?
            accessPointOrSlugsOrRequestOptions :
            Array.isArray(slugsOrRequestOptions) ? slugsOrRequestOptions : void 0;
        requestOptions = HTTP_1.RequestUtils.isOptions(accessPointOrSlugsOrRequestOptions) ? accessPointOrSlugsOrRequestOptions :
            Utils_1.isObject(slugsOrRequestOptions) && slugsOrRequestOptions !== slugs ? slugsOrRequestOptions : requestOptions;
        HTTP_1.RequestUtils.setPreferredRetrieval(retrievalType, requestOptions);
        var slugsLength = Array.isArray(slugs) ? slugs.length : 0;
        var total = accessPoints.length;
        var promises = Array(total);
        for (var index = 0; index < total; ++index) {
            var cloneOptions = HTTP_1.RequestUtils.cloneOptions(requestOptions);
            var slug = index < slugsLength ? slugs[index] : void 0;
            promises[index] = persistAccessPoint(registry, url, cloneOptions, accessPoints[index], slug);
        }
        return Promise.all(promises);
    });
}
function refreshResource(registry, resource, requestOptions) {
    var url = HTTP_1.RequestUtils.getRequestURLFor(registry, resource);
    setDefaultRequestOptions(registry, requestOptions, Vocabularies_1.LDP.RDFSource);
    HTTP_1.RequestUtils.setIfNoneMatchHeader(resource._eTag, requestOptions);
    return HTTP_1.RequestService
        .get(url, requestOptions, new RDF_1.RDFDocumentParser())
        .then(function (_a) {
        var rdfDocuments = _a[0], response = _a[1];
        if (response === null)
            return resource;
        var rdfDocument = rdfDocuments.find(function (node) { return node["@id"] === url; });
        if (rdfDocument === null)
            throw new Errors_2.BadResponseError("No document was returned.", response);
        var eTag = response.getETag();
        return parseRDFDocument(registry, rdfDocument, eTag);
    })
        .catch(function (response) {
        if (response.status === 304)
            return resource;
        return resource._registry._parseFailedResponse(response);
    });
}
function addResourcePatch(registry, deltaCreator, pointer, current, snapshot) {
    var schema = registry.getSchemaFor(pointer);
    deltaCreator.addResource(schema, pointer.id, snapshot, current);
}
function sendPatch(registry, resource, requestOptions) {
    var url = HTTP_1.RequestUtils.getRequestURLFor(registry, resource);
    if (!resource.isDirty())
        return Promise.resolve(resource);
    resource._normalize();
    setDefaultRequestOptions(registry, requestOptions);
    HTTP_1.RequestUtils.setContentTypeHeader("text/ldpatch", requestOptions);
    HTTP_1.RequestUtils.setIfMatchHeader(resource._eTag, requestOptions);
    var deltaCreator = new LDPatch_1.DeltaCreator(resource._registry.jsonldConverter);
    addResourcePatch(registry, deltaCreator, resource, resource, resource._snapshot);
    resource
        .getPointers(true)
        .forEach(function (pointer) {
        var snapshot = Resource_1.PersistedResource.is(pointer) ? pointer._snapshot : {};
        addResourcePatch(registry, deltaCreator, pointer, pointer, snapshot);
    });
    resource._savedFragments
        .filter(function (pointer) { return !resource.hasPointer(pointer.id); })
        .forEach(function (pointer) {
        addResourcePatch(registry, deltaCreator, pointer, {}, pointer._snapshot);
    });
    var body = deltaCreator.getPatch();
    return HTTP_1.RequestService
        .patch(url, body, requestOptions)
        .then(function (response) {
        return applyResponseRepresentation(registry, resource, response);
    })
        .catch(registry._parseFailedResponse.bind(resource));
}
var PROTOTYPE = {
    get: function (uriOrOptions, requestOptions) {
        var _this = this;
        return Utils_1.promiseMethod(function () {
            var registry = getRegistry(_this);
            var uri = Utils_1.isString(uriOrOptions) ? uriOrOptions : void 0;
            var url = HTTP_1.RequestUtils.getRequestURLFor(registry, _this, uri);
            requestOptions = Utils_1.isObject(uriOrOptions) ? uriOrOptions :
                requestOptions ? requestOptions : {};
            return getFullResource(registry, url, requestOptions);
        });
    },
    resolve: function (requestOptions) {
        var _this = this;
        if (requestOptions === void 0) { requestOptions = {}; }
        return Utils_1.promiseMethod(function () {
            var registry = getRegistry(_this);
            var url = HTTP_1.RequestUtils.getRequestURLFor(registry, _this);
            return getFullResource(registry, url, requestOptions);
        });
    },
    exists: function (uri, requestOptions) {
        var _this = this;
        if (requestOptions === void 0) { requestOptions = {}; }
        return Utils_1.promiseMethod(function () {
            var registry = getRegistry(_this);
            var url = HTTP_1.RequestUtils.getRequestURLFor(registry, _this, uri);
            setDefaultRequestOptions(registry, requestOptions, Vocabularies_1.LDP.RDFSource);
            return HTTP_1.RequestService
                .head(url, requestOptions)
                .then(function () { return true; })
                .catch(function (response) {
                if (response.status === 404)
                    return false;
                return registry._parseFailedResponse(response);
            });
        });
    },
    create: function (uriOrChildren, childrenOrSlugsOrOptions, slugsOrOptions, requestOptions) {
        return createChildren("minimal", this, uriOrChildren, childrenOrSlugsOrOptions, slugsOrOptions, requestOptions);
    },
    createAndRetrieve: function (uriOrChildren, childrenOrSlugsOrOptions, slugsOrOptions, requestOptions) {
        if (requestOptions === void 0) { requestOptions = {}; }
        return createChildren("representation", this, uriOrChildren, childrenOrSlugsOrOptions, slugsOrOptions, requestOptions);
    },
    createAccessPoint: function (uriOrAccessPoint, accessPointOrSlugOrRequestOptions, slugOrRequestOptions, requestOptions) {
        return createAccessPoint("minimal", this, uriOrAccessPoint, accessPointOrSlugOrRequestOptions, slugOrRequestOptions, requestOptions);
    },
    createAccessPointAndRetrieve: function (uriOrAccessPoint, accessPointOrSlugOrRequestOptions, slugOrRequestOptions, requestOptions) {
        return createAccessPoint("representation", this, uriOrAccessPoint, accessPointOrSlugOrRequestOptions, slugOrRequestOptions, requestOptions);
    },
    createAccessPoints: function (uriOrAccessPoints, accessPointsOrSlugsOrRequestOptions, slugsOrRequestOptions, requestOptions) {
        return createAccessPoints("minimal", this, uriOrAccessPoints, accessPointsOrSlugsOrRequestOptions, slugsOrRequestOptions, requestOptions);
    },
    createAccessPointsAndRetrieve: function (uriOrAccessPoints, accessPointsOrSlugsOrRequestOptions, slugsOrRequestOptions, requestOptions) {
        return createAccessPoints("representation", this, uriOrAccessPoints, accessPointsOrSlugsOrRequestOptions, slugsOrRequestOptions, requestOptions);
    },
    refresh: function (requestOptions) {
        var _this = this;
        if (requestOptions === void 0) { requestOptions = {}; }
        return Utils_1.promiseMethod(function () {
            if (!Resource_1.PersistedResource.is(_this))
                throw new Errors_1.IllegalArgumentError("The resource isn't a persisted resource.");
            var registry = getRegistry(_this);
            return refreshResource(registry, _this, requestOptions);
        });
    },
    save: function (requestOptions) {
        var _this = this;
        if (requestOptions === void 0) { requestOptions = {}; }
        return Utils_1.promiseMethod(function () {
            if (!Resource_1.PersistedResource.is(_this))
                throw new Errors_1.IllegalArgumentError("The resource isn't a persisted resource.");
            var registry = getRegistry(_this);
            HTTP_1.RequestUtils.setPreferredRetrieval("minimal", requestOptions);
            return sendPatch(registry, _this, requestOptions);
        });
    },
    saveAndRefresh: function (requestOptions) {
        var _this = this;
        if (requestOptions === void 0) { requestOptions = {}; }
        return Utils_1.promiseMethod(function () {
            if (!Resource_1.PersistedResource.is(_this))
                throw new Errors_1.IllegalArgumentError("The resource isn't a persisted resource.");
            var registry = getRegistry(_this);
            HTTP_1.RequestUtils.setPreferredRetrieval("representation", requestOptions);
            return sendPatch(registry, _this, requestOptions);
        });
    },
    delete: function (uriOrOptions, requestOptions) {
        var _this = this;
        return Utils_1.promiseMethod(function () {
            var registry = getRegistry(_this);
            var uri = Utils_1.isString(uriOrOptions) ? uriOrOptions : void 0;
            var url = HTTP_1.RequestUtils.getRequestURLFor(registry, _this, uri);
            requestOptions = Utils_1.isObject(uriOrOptions) ?
                uriOrOptions :
                requestOptions ? requestOptions : {};
            setDefaultRequestOptions(registry, requestOptions, Vocabularies_1.LDP.RDFSource);
            return HTTP_1.RequestService
                .delete(url, requestOptions)
                .then(function () {
                _this._registry.removePointer(url);
            })
                .catch(_this._registry._parseFailedResponse.bind(_this));
        });
    },
};
exports.CRUDDocument = {
    PROTOTYPE: PROTOTYPE,
    isDecorated: function (object) {
        return Utils_1.isObject(object)
            && core_1.ModelDecorator
                .hasPropertiesFrom(PROTOTYPE, object);
    },
    decorate: function (object) {
        if (exports.CRUDDocument.isDecorated(object))
            return object;
        var resource = core_1.ModelDecorator
            .decorateMultiple(object, BasePersistedDocument_1.BasePersistedDocument);
        return core_1.ModelDecorator
            .definePropertiesFrom(PROTOTYPE, resource);
    },
    is: function (value) {
        return Utils_1.isObject(value)
            && BasePersistedDocument_1.BasePersistedDocument.is(value)
            && exports.CRUDDocument.isDecorated(value);
    },
};

//# sourceMappingURL=CRUDDocument.js.map
