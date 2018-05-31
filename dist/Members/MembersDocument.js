"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("../core");
var Errors_1 = require("../Errors");
var FreeResources_1 = require("../FreeResources");
var HTTP_1 = require("../HTTP");
var Pointer_1 = require("../Pointer");
var Resource_1 = require("../Resource");
var Utils_1 = require("../Utils");
var Vocabularies_1 = require("../Vocabularies");
var AddMemberAction_1 = require("./AddMemberAction");
var RemoveMemberAction_1 = require("./RemoveMemberAction");
function getRegistry(repository) {
    if (repository._registry && repository._registry.context)
        return repository._registry;
    throw new Errors_1.IllegalActionError("\"" + repository.id + "\" doesn't support Members management requests.");
}
function setDefaultRequestOptions(registry, requestOptions) {
    if (registry.context && registry.context.auth)
        registry.context.auth.addAuthentication(requestOptions);
    HTTP_1.RequestUtils.setPreferredInteractionModel(Vocabularies_1.LDP.Container, requestOptions);
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
    if (requestOptions === void 0) { requestOptions = {}; }
    return Utils_1.promiseMethod(function () {
        var registry = getRegistry(repository);
        var url = HTTP_1.RequestUtils.getRequestURLFor(registry, repository, uri);
        var targetMembers = parseMembers(registry, members);
        setDefaultRequestOptions(registry, requestOptions);
        HTTP_1.RequestUtils.setContentTypeHeader("application/ld+json", requestOptions);
        var freeResources = FreeResources_1.FreeResources.createFrom({
            _registry: registry,
        });
        freeResources._register(AddMemberAction_1.AddMemberAction.createFrom({ targetMembers: targetMembers }));
        var body = JSON.stringify(freeResources);
        return HTTP_1.RequestService
            .put(url, body, requestOptions)
            .then(function () { })
            .catch(registry._parseFailedResponse.bind(registry));
    });
}
function sendRemoveAction(repository, uri, members, requestOptions) {
    if (requestOptions === void 0) { requestOptions = {}; }
    return Utils_1.promiseMethod(function () {
        var registry = getRegistry(repository);
        var url = HTTP_1.RequestUtils.getRequestURLFor(registry, repository, uri);
        var targetMembers = parseMembers(registry, members);
        setDefaultRequestOptions(registry, requestOptions);
        HTTP_1.RequestUtils.setContentTypeHeader("application/ld+json", requestOptions);
        HTTP_1.RequestUtils.setRetrievalPreferences({
            include: [Vocabularies_1.C.PreferSelectedMembershipTriples],
            omit: [Vocabularies_1.C.PreferMembershipTriples],
        }, requestOptions);
        var freeResources = FreeResources_1.FreeResources.createFrom({
            _registry: registry,
        });
        freeResources._register(RemoveMemberAction_1.RemoveMemberAction.createFrom({ targetMembers: targetMembers }));
        var body = JSON.stringify(freeResources);
        return HTTP_1.RequestService
            .delete(url, body, requestOptions)
            .then(function () { })
            .catch(registry._parseFailedResponse.bind(registry));
    });
}
var PROTOTYPE = {
    _registry: void 0,
    addMember: function (uriOrMember, memberOrOptions, requestOptions) {
        requestOptions = Utils_1.isObject(memberOrOptions) && !Pointer_1.Pointer.is(memberOrOptions) ?
            memberOrOptions :
            requestOptions;
        var member = memberOrOptions !== requestOptions ?
            memberOrOptions :
            uriOrMember;
        var uri = member !== uriOrMember ?
            uriOrMember :
            void 0;
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
            void 0;
        return sendAddAction(this, uri, members, requestOptions);
    },
    removeMember: function (uriOrMember, memberOrOptions, requestOptions) {
        requestOptions = Utils_1.isObject(memberOrOptions) && !Pointer_1.Pointer.is(memberOrOptions) ?
            memberOrOptions :
            requestOptions;
        var member = memberOrOptions !== requestOptions ?
            memberOrOptions :
            uriOrMember;
        var uri = member !== uriOrMember ?
            uriOrMember :
            void 0;
        return sendRemoveAction(this, uri, [member], requestOptions);
    },
    removeMembers: function (uriOrMembers, membersOrOptions, requestOptions) {
        requestOptions = !Array.isArray(membersOrOptions) ?
            membersOrOptions :
            requestOptions;
        var members = membersOrOptions !== requestOptions ?
            membersOrOptions :
            uriOrMembers;
        var uri = members !== uriOrMembers ?
            uriOrMembers :
            void 0;
        return sendRemoveAction(this, uri, members, requestOptions);
    },
    removeAllMembers: function (uriOrOptions, requestOptions) {
        var _this = this;
        requestOptions = Utils_1.isObject(uriOrOptions) ? uriOrOptions :
            requestOptions ? requestOptions : {};
        var uri = uriOrOptions !== requestOptions ?
            uriOrOptions :
            void 0;
        return Utils_1.promiseMethod(function () {
            var registry = getRegistry(_this);
            var url = HTTP_1.RequestUtils.getRequestURLFor(registry, _this, uri);
            setDefaultRequestOptions(registry, requestOptions);
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
                .delete(url, requestOptions)
                .then(function () { })
                .catch(registry._parseFailedResponse.bind(registry));
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
            .decorateMultiple(object, Resource_1.TransientResource);
        return core_1.ModelDecorator
            .definePropertiesFrom(PROTOTYPE, resource);
    },
};

//# sourceMappingURL=MembersDocument.js.map
