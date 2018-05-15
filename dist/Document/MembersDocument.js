"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("../core");
var Errors_1 = require("../Errors");
var FreeResources_1 = require("../FreeResources");
var HTTP_1 = require("../HTTP");
var LDP_1 = require("../LDP");
var Pointer_1 = require("../Pointer");
var Utils_1 = require("../Utils");
var Vocabularies_1 = require("../Vocabularies");
var TransientDocument_1 = require("./TransientDocument");
function getRegistry(repository) {
    if (repository._registry)
        return repository._registry;
    throw new Errors_1.IllegalActionError("\"" + repository.id + "\" does't support members management requests.");
}
function setDefaultRequestOptions(registry, requestOptions, interactionModel) {
    registry._context.auth.addAuthentication(requestOptions);
    if (interactionModel)
        HTTP_1.RequestUtils.setPreferredInteractionModel(interactionModel, requestOptions);
    HTTP_1.RequestUtils.setAcceptHeader("application/ld+json", requestOptions);
    return requestOptions;
}
function parseMembers(registry, pointers) {
    return pointers.map(function (pointer) {
        if (Utils_1.isString(pointer))
            return registry.getPointer(pointer);
        if (Pointer_1.Pointer.is(pointer))
            return pointer;
        throw new Errors_1.IllegalArgumentError("No valid Pointer or URI provided.");
    });
}
function sendAddAction(repository, uri, members, requestOptions) {
    return Utils_1.promiseMethod(function () {
        var registry = getRegistry(repository);
        var iri = registry._resolveIRIFor(repository, uri);
        var targetMembers = parseMembers(registry, members);
        setDefaultRequestOptions(registry, requestOptions, Vocabularies_1.LDP.Container);
        HTTP_1.RequestUtils.setContentTypeHeader("application/ld+json", requestOptions);
        var freeResources = FreeResources_1.FreeResources.createFrom({
            _registry: registry,
            _context: registry._context,
        });
        freeResources._register(LDP_1.AddMemberAction.createFrom({ targetMembers: targetMembers }));
        var body = JSON.stringify(freeResources);
        return HTTP_1.RequestService
            .put(iri, body, requestOptions)
            .then(function () { })
            .catch(registry._parseErrorResponse.bind(registry));
    });
}
function sendRemoveAction(repository, uri, members, requestOptions) {
    return Utils_1.promiseMethod(function () {
        var registry = getRegistry(repository);
        var iri = registry._resolveIRIFor(repository, uri);
        var targetMembers = parseMembers(registry, members);
        setDefaultRequestOptions(registry, requestOptions, Vocabularies_1.LDP.Container);
        HTTP_1.RequestUtils.setContentTypeHeader("application/ld+json", requestOptions);
        HTTP_1.RequestUtils.setRetrievalPreferences({
            include: [Vocabularies_1.C.PreferSelectedMembershipTriples],
            omit: [Vocabularies_1.C.PreferMembershipTriples],
        }, requestOptions);
        var freeResources = FreeResources_1.FreeResources.createFrom({
            _registry: registry,
            _context: registry._context,
        });
        freeResources._register(LDP_1.RemoveMemberAction.createFrom({ targetMembers: targetMembers }));
        var body = JSON.stringify(freeResources);
        return HTTP_1.RequestService
            .delete(iri, body, requestOptions)
            .then(function () { })
            .catch(registry._parseErrorResponse.bind(registry));
    });
}
var PROTOTYPE = {
    addMember: function (uriOrMember, memberOrOptions, requestOptions) {
        requestOptions = Utils_1.isObject(memberOrOptions) && !Pointer_1.Pointer.is(memberOrOptions) ?
            memberOrOptions :
            requestOptions;
        var member = memberOrOptions !== requestOptions ?
            memberOrOptions :
            uriOrMember;
        var uri = member !== uriOrMember ?
            uriOrMember :
            "";
        return sendAddAction(this, uri, [member], requestOptions);
    },
    addMembers: function (uriOrMembers, membersOrOptions, requestOptions) {
        requestOptions = !Array.isArray(membersOrOptions) ?
            membersOrOptions :
            requestOptions;
        var members = membersOrOptions !== requestOptions ?
            membersOrOptions :
            uriOrMembers;
        var uri = members !== uriOrMembers ?
            uriOrMembers :
            "";
        return sendAddAction(this, uri, members, requestOptions);
    },
    removeMember: function (uriOrMember, memberOrOptions, requestOptions) {
        requestOptions = Utils_1.isObject(memberOrOptions) && !Pointer_1.Pointer.is(memberOrOptions) ?
            memberOrOptions :
            requestOptions ? requestOptions : {};
        var member = memberOrOptions !== requestOptions ?
            memberOrOptions :
            uriOrMember;
        var uri = member !== uriOrMember ?
            uriOrMember :
            "";
        return sendRemoveAction(this, uri, [member], requestOptions);
    },
    removeMembers: function (uriOrMembers, membersOrOptions, requestOptions) {
        requestOptions = !Array.isArray(membersOrOptions) ?
            membersOrOptions :
            requestOptions ? requestOptions : {};
        var members = membersOrOptions !== requestOptions ?
            membersOrOptions :
            uriOrMembers;
        var uri = members !== uriOrMembers ?
            uriOrMembers :
            "";
        return sendRemoveAction(this, uri, members, requestOptions);
    },
    removeAllMembers: function (uriOrOptions, requestOptions) {
        var _this = this;
        requestOptions = Utils_1.isObject(uriOrOptions) ? uriOrOptions :
            requestOptions ? requestOptions : {};
        var uri = uriOrOptions !== requestOptions ?
            uriOrOptions :
            "";
        return Utils_1.promiseMethod(function () {
            var registry = getRegistry(_this);
            var iri = registry._resolveIRIFor(_this, uri);
            setDefaultRequestOptions(registry, requestOptions, Vocabularies_1.LDP.Container);
            HTTP_1.RequestUtils.setRetrievalPreferences({
                include: [
                    Vocabularies_1.C.PreferMembershipTriples,
                ],
                omit: [
                    Vocabularies_1.C.PreferMembershipResources,
                    Vocabularies_1.C.PreferContainmentTriples,
                    Vocabularies_1.C.PreferContainmentResources,
                    Vocabularies_1.C.PreferContainer,
                ],
            }, requestOptions);
            return HTTP_1.RequestService
                .delete(iri, requestOptions)
                .then(function () { })
                .catch(registry._parseErrorResponse.bind(registry));
        });
    },
};
exports.MembersDocument = {
    PROTOTYPE: PROTOTYPE,
    isDecorated: function (object) {
        return Utils_1.isObject(object)
            && core_1.ModelDecorator
                .hasPropertiesFrom(PROTOTYPE, object);
    },
    decorate: function (object) {
        if (exports.MembersDocument.isDecorated(object))
            return object;
        var resource = core_1.ModelDecorator
            .decorateMultiple(object, TransientDocument_1.TransientDocument);
        return core_1.ModelDecorator
            .definePropertiesFrom(PROTOTYPE, resource);
    },
};

//# sourceMappingURL=MembersDocument.js.map
