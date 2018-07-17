"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TransientDocument_1 = require("../../Document/TransientDocument");
var IllegalArgumentError_1 = require("../../Errors/IllegalArgumentError");
var FreeResources_1 = require("../../FreeResources/FreeResources");
var BadResponseError_1 = require("../../HTTP/Errors/ServerErrors/BadResponseError");
var Request_1 = require("../../HTTP/Request");
var JSONLDCompacter_1 = require("../../JSONLD/JSONLDCompacter");
var JSONLDParser_1 = require("../../JSONLD/JSONLDParser");
var AddMemberAction_1 = require("../../LDP/AddMemberAction");
var RemoveMemberAction_1 = require("../../LDP/RemoveMemberAction");
var ResponseMetadata_1 = require("../../LDP/ResponseMetadata");
var DeltaCreator_1 = require("../../LDPatch/DeltaCreator");
var ModelDecorator_1 = require("../../Model/ModelDecorator");
var Pointer_1 = require("../../Pointer/Pointer");
var Document_1 = require("../../RDF/Document");
var ResolvablePointer_1 = require("../../Repository/ResolvablePointer");
var Utils_1 = require("../../Utils");
var C_1 = require("../../Vocabularies/C");
var LDP_1 = require("../../Vocabularies/LDP");
var Utils_2 = require("../Utils");
var HTTPRepositoryTrait_1 = require("./HTTPRepositoryTrait");
var __JSONLD_PARSER = new JSONLDParser_1.JSONLDParser();
function __setDefaultRequestOptions(requestOptions, interactionModel) {
    if (interactionModel)
        Request_1.RequestUtils.setPreferredInteractionModel(interactionModel, requestOptions);
    Request_1.RequestUtils.setAcceptHeader("application/ld+json", requestOptions);
}
function __getTargetID(id, response) {
    var locationHeader = response.getHeader("Content-Location");
    if (!locationHeader)
        return id;
    if (locationHeader.values.length !== 1)
        throw new BadResponseError_1.BadResponseError("The response must contain one Content-Location header.", response);
    var locationString = "" + locationHeader;
    if (!locationString)
        throw new BadResponseError_1.BadResponseError("The response doesn't contain a valid 'Content-Location' header.", response);
    return locationString;
}
function __getErrorResponseParserFnFrom(repository) {
    return Utils_2._getErrorResponseParserFn(repository.$context.registry);
}
function __changeNodesID(resource, map) {
    map
        .entries
        .forEach(function (_a) {
        var entryKey = _a.entryKey, entryValue = _a.entryValue;
        var node = resource
            .$getPointer(entryKey.$id, true);
        resource.$removePointer(entryKey.$id);
        node.$id = entryValue.$id;
        resource.$_addPointer(node);
    });
}
function __applyResponseMetadata(repository, freeNodes) {
    if (!freeNodes.length)
        return;
    var freeResources = FreeResources_1.FreeResources.parseFreeNodes(repository.$context.registry, freeNodes);
    var responseMetadata = freeResources
        .$getPointers(true)
        .find(ResponseMetadata_1.ResponseMetadata.is);
    responseMetadata
        .documentsMetadata
        .forEach(function (metadata) { return __changeNodesID(metadata.relatedDocument, metadata.bNodesMap); });
}
function __applyResponseRepresentation(repository, resource, response) {
    if (response.status === 204 || !response.data)
        return resource;
    return __JSONLD_PARSER
        .parse(response.data)
        .then(function (expandedResult) {
        var freeNodes = Document_1.RDFDocument.getFreeNodes(expandedResult);
        __applyResponseMetadata(repository, freeNodes);
        var preferenceHeader = response.getHeader("Preference-Applied");
        if (preferenceHeader === null || preferenceHeader.toString() !== "return=representation")
            return resource;
        return repository._parseResponseData(response, resource.$id);
    });
}
function __isInvalidChild(child) {
    return ResolvablePointer_1.ResolvablePointer.is(child);
}
function __isPersistingChild(object) {
    return object["__CarbonLDP_persisting__"];
}
function __createChild(repository, parentURI, requestOptions, child, slug) {
    if (ResolvablePointer_1.ResolvablePointer.is(child))
        throw new IllegalArgumentError_1.IllegalArgumentError("Cannot persist an already resolvable pointer.");
    var transient = TransientDocument_1.TransientDocument.is(child) ?
        child : TransientDocument_1.TransientDocument.decorate(child);
    transient.$_normalize();
    transient.$registry = repository.$context.registry;
    var body = JSON.stringify(transient);
    if (!!slug)
        Request_1.RequestUtils.setSlug(slug, requestOptions);
    Object.defineProperty(transient, "__CarbonLDP_persisting__", { configurable: true, value: true });
    return Request_1.RequestService
        .post(parentURI, body, requestOptions)
        .then(function (response) {
        delete transient["__CarbonLDP_persisting__"];
        var locationHeader = response.getHeader("Location");
        if (locationHeader === null || locationHeader.values.length < 1)
            throw new BadResponseError_1.BadResponseError("The response is missing a Location header.", response);
        if (locationHeader.values.length !== 1)
            throw new BadResponseError_1.BadResponseError("The response contains more than one Location header.", response);
        transient.$id = locationHeader.values[0].toString();
        var document = repository.$context.registry.$_addPointer(transient);
        document
            .$getFragments()
            .forEach(document.$__modelDecorator.decorate);
        document.$_syncSnapshot();
        return __applyResponseRepresentation(repository, document, response);
    })
        .catch(function (error) {
        delete transient["__CarbonLDP_persisting__"];
        return __getErrorResponseParserFnFrom(repository)(error);
    });
}
function __createChildren(retrievalType, repository, uri, children, slugsOrOptions, requestOptions) {
    if (!repository.$context.registry.$inScope(uri, true))
        return Promise.reject(new IllegalArgumentError_1.IllegalArgumentError("\"" + uri + "\" is out of scope."));
    var url = repository.$context.getObjectSchema().resolveURI(uri, { base: true });
    requestOptions = Request_1.RequestUtils.isOptions(slugsOrOptions) ?
        slugsOrOptions :
        requestOptions ? requestOptions : {};
    var slugs = Utils_1.isString(slugsOrOptions) || Array.isArray(slugsOrOptions) ?
        slugsOrOptions : null;
    __setDefaultRequestOptions(requestOptions, LDP_1.LDP.Container);
    Request_1.RequestUtils.setPreferredRetrieval(retrievalType, requestOptions);
    Request_1.RequestUtils.setContentTypeHeader("application/ld+json", requestOptions);
    if (!Array.isArray(children)) {
        if (__isInvalidChild(children))
            return Promise.reject(new IllegalArgumentError_1.IllegalArgumentError("The object is already a resolvable pointer."));
        if (__isPersistingChild(children))
            return Promise.reject(new IllegalArgumentError_1.IllegalArgumentError("The object is already being persisted."));
        return __createChild(repository, url, requestOptions, children, slugs ? slugs.toString() : null);
    }
    var invalidChild = children
        .findIndex(function (child) { return __isInvalidChild(child); });
    if (invalidChild !== -1)
        return Promise.reject(new IllegalArgumentError_1.IllegalArgumentError("The object in \"" + invalidChild + "\" is already a resolvable pointer."));
    var persistingChild = children
        .findIndex(function (child) { return __isPersistingChild(child); });
    if (persistingChild !== -1)
        return Promise.reject(new IllegalArgumentError_1.IllegalArgumentError("The object in \"" + persistingChild + "\" is already being persisted."));
    var promises = children.map(function (child, index) {
        var cloneOptions = Request_1.RequestUtils.cloneOptions(requestOptions);
        var slug = slugs && index < slugs.length ? slugs[index] : void 0;
        return __createChild(repository, url, cloneOptions, child, slug);
    });
    return Promise.all(promises);
}
function __sendPatch(repository, document, requestOptions) {
    if (!ResolvablePointer_1.ResolvablePointer.is(document))
        return Promise.reject(new IllegalArgumentError_1.IllegalArgumentError("The document isn't a resolvable pointer."));
    if (!repository.$context.registry.$inScope(document.$id))
        return Promise.reject(new IllegalArgumentError_1.IllegalArgumentError("\"" + document.$id + "\" is out of scope."));
    var url = repository.$context.getObjectSchema().resolveURI(document.$id, { base: true });
    if (!document.$isDirty())
        return Promise.resolve(document);
    document.$_normalize();
    __setDefaultRequestOptions(requestOptions);
    Request_1.RequestUtils.setContentTypeHeader("text/ldpatch", requestOptions);
    Request_1.RequestUtils.setIfMatchHeader(document.$eTag, requestOptions);
    var deltaCreator = new DeltaCreator_1.DeltaCreator(repository.$context);
    deltaCreator.addResource(document.$id, document.$_snapshot, document);
    document
        .$getPointers(true)
        .forEach(function (pointer) {
        deltaCreator.addResource(pointer.$id, pointer.$_snapshot, pointer);
    });
    document.$__savedFragments
        .filter(function (pointer) { return !document.$hasPointer(pointer.$id); })
        .forEach(function (pointer) {
        deltaCreator.addResource(pointer.$id, pointer.$_snapshot, {});
    });
    var body = deltaCreator.getPatch();
    return Request_1.RequestService
        .patch(url, body, requestOptions)
        .then(function (response) {
        return __applyResponseRepresentation(repository, document, response);
    })
        .catch(__getErrorResponseParserFnFrom(repository));
}
function __parseMembers(registry, pointers) {
    return pointers
        .map(function (pointer) {
        if (Utils_1.isString(pointer))
            return registry.$getPointer(pointer);
        if (Pointer_1.Pointer.is(pointer))
            return pointer;
    })
        .filter(function (pointer) { return !!pointer; });
}
function __sendAddAction(repository, uri, members, requestOptions) {
    if (requestOptions === void 0) { requestOptions = {}; }
    if (!repository.$context.registry.$inScope(uri, true))
        return Promise.reject(new IllegalArgumentError_1.IllegalArgumentError("\"" + uri + "\" is out of scope."));
    var url = repository.$context.getObjectSchema().resolveURI(uri, { base: true });
    __setDefaultRequestOptions(requestOptions, LDP_1.LDP.Container);
    Request_1.RequestUtils.setContentTypeHeader("application/ld+json", requestOptions);
    var freeResources = FreeResources_1.FreeResources.createFrom({ $registry: repository.$context.registry });
    var targetMembers = __parseMembers(repository.$context.registry, members);
    freeResources.$_addPointer(AddMemberAction_1.AddMemberAction.createFrom({ targetMembers: targetMembers }));
    var body = JSON.stringify(freeResources);
    return Request_1.RequestService
        .put(url, body, requestOptions)
        .then(function () { })
        .catch(__getErrorResponseParserFnFrom(repository));
}
function __sendRemoveAction(repository, uri, members, requestOptions) {
    if (requestOptions === void 0) { requestOptions = {}; }
    if (!repository.$context.registry.$inScope(uri, true))
        return Promise.reject(new IllegalArgumentError_1.IllegalArgumentError("\"" + uri + "\" is out of scope."));
    var url = repository.$context.getObjectSchema().resolveURI(uri, { base: true });
    __setDefaultRequestOptions(requestOptions, LDP_1.LDP.Container);
    Request_1.RequestUtils.setContentTypeHeader("application/ld+json", requestOptions);
    Request_1.RequestUtils.setRetrievalPreferences({
        include: [C_1.C.PreferSelectedMembershipTriples],
        omit: [C_1.C.PreferMembershipTriples],
    }, requestOptions);
    var freeResources = FreeResources_1.FreeResources.createFrom({ $registry: repository.$context.registry });
    var targetMembers = __parseMembers(repository.$context.registry, members);
    freeResources.$_addPointer(RemoveMemberAction_1.RemoveMemberAction.createFrom({ targetMembers: targetMembers }));
    var body = JSON.stringify(freeResources);
    return Request_1.RequestService
        .delete(url, body, requestOptions)
        .then(function () { })
        .catch(__getErrorResponseParserFnFrom(repository));
}
function __sendRemoveAll(repository, uri, requestOptions) {
    if (requestOptions === void 0) { requestOptions = {}; }
    if (!repository.$context.registry.$inScope(uri, true))
        return Promise.reject(new IllegalArgumentError_1.IllegalArgumentError("\"" + uri + "\" is out of scope."));
    var url = repository.$context.getObjectSchema().resolveURI(uri, { base: true });
    __setDefaultRequestOptions(requestOptions, LDP_1.LDP.Container);
    Request_1.RequestUtils.setRetrievalPreferences({
        include: [
            C_1.C.PreferMembershipTriples,
        ],
        omit: [
            C_1.C.PreferMembershipResources,
            C_1.C.PreferContainmentTriples,
            C_1.C.PreferContainmentResources,
            C_1.C.PreferContainer,
        ],
    }, requestOptions);
    return Request_1.RequestService
        .delete(url, requestOptions)
        .then(function () { })
        .catch(__getErrorResponseParserFnFrom(repository));
}
exports.LDPDocumentsRepositoryTrait = {
    PROTOTYPE: {
        $get: function (uri, requestOptions) {
            if (requestOptions === void 0) { requestOptions = {}; }
            __setDefaultRequestOptions(requestOptions, LDP_1.LDP.RDFSource);
            return HTTPRepositoryTrait_1.HTTPRepositoryTrait.PROTOTYPE
                .$get.call(this, uri, requestOptions)
                .catch(__getErrorResponseParserFnFrom(this));
        },
        $exists: function (uri, requestOptions) {
            if (requestOptions === void 0) { requestOptions = {}; }
            __setDefaultRequestOptions(requestOptions, LDP_1.LDP.RDFSource);
            return HTTPRepositoryTrait_1.HTTPRepositoryTrait.PROTOTYPE
                .$exists.call(this, uri, requestOptions)
                .catch(__getErrorResponseParserFnFrom(this));
        },
        create: function (uri, children, slugsOrOptions, requestOptions) {
            return __createChildren("minimal", this, uri, children, slugsOrOptions, requestOptions);
        },
        createAndRetrieve: function (uri, children, slugsOrOptions, requestOptions) {
            return __createChildren("representation", this, uri, children, slugsOrOptions, requestOptions);
        },
        $refresh: function (document, requestOptions) {
            if (requestOptions === void 0) { requestOptions = {}; }
            __setDefaultRequestOptions(requestOptions, LDP_1.LDP.RDFSource);
            Request_1.RequestUtils.setIfNoneMatchHeader(document.$eTag, requestOptions);
            return HTTPRepositoryTrait_1.HTTPRepositoryTrait.PROTOTYPE
                .$refresh.call(this, document, requestOptions)
                .catch(__getErrorResponseParserFnFrom(this));
        },
        $save: function (document, requestOptions) {
            if (requestOptions === void 0) { requestOptions = {}; }
            Request_1.RequestUtils.setPreferredRetrieval("minimal", requestOptions);
            return __sendPatch(this, document, requestOptions);
        },
        $saveAndRefresh: function (document, requestOptions) {
            if (requestOptions === void 0) { requestOptions = {}; }
            Request_1.RequestUtils.setPreferredRetrieval("representation", requestOptions);
            return __sendPatch(this, document, requestOptions);
        },
        $delete: function (uri, requestOptions) {
            if (requestOptions === void 0) { requestOptions = {}; }
            __setDefaultRequestOptions(requestOptions, LDP_1.LDP.RDFSource);
            return HTTPRepositoryTrait_1.HTTPRepositoryTrait.PROTOTYPE
                .$delete.call(this, uri, requestOptions)
                .catch(__getErrorResponseParserFnFrom(this));
        },
        addMember: function (uri, member, requestOptions) {
            return __sendAddAction(this, uri, [member], requestOptions);
        },
        addMembers: function (uri, members, requestOptions) {
            return __sendAddAction(this, uri, members, requestOptions);
        },
        removeMember: function (uri, member, requestOptions) {
            return __sendRemoveAction(this, uri, [member], requestOptions);
        },
        removeMembers: function (uri, membersOrOptions, requestOptions) {
            if (Array.isArray(membersOrOptions))
                return __sendRemoveAction(this, uri, membersOrOptions, requestOptions);
            return __sendRemoveAll(this, uri, membersOrOptions || requestOptions);
        },
        _parseResponseData: function (response, id) {
            var _this = this;
            return __JSONLD_PARSER
                .parse(response.data)
                .then(function (rdfNodes) {
                var rdfDocuments = Document_1.RDFDocument
                    .getDocuments(rdfNodes);
                var documents = new JSONLDCompacter_1.JSONLDCompacter(_this.$context.registry)
                    .compactDocuments(rdfDocuments);
                id = __getTargetID(id, response);
                var target = documents.find(function (doc) { return doc.$id === id; });
                if (!target)
                    throw new BadResponseError_1.BadResponseError("No document \"" + id + "\" was returned.", response);
                target.$eTag = response.getETag();
                target.$_resolved = true;
                return target;
            });
        },
    },
    isDecorated: function (object) {
        return ModelDecorator_1.ModelDecorator
            .hasPropertiesFrom(exports.LDPDocumentsRepositoryTrait.PROTOTYPE, object);
    },
    decorate: function (object) {
        if (exports.LDPDocumentsRepositoryTrait.isDecorated(object))
            return object;
        var target = ModelDecorator_1.ModelDecorator
            .decorateMultiple(object, HTTPRepositoryTrait_1.HTTPRepositoryTrait);
        return ModelDecorator_1.ModelDecorator
            .definePropertiesFrom(exports.LDPDocumentsRepositoryTrait.PROTOTYPE, target);
    },
};

//# sourceMappingURL=LDPDocumentsRepositoryTrait.js.map
