"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Utils_1 = require("../../DocumentsRepository/Utils");
var ModelDecorator_1 = require("../../Model/ModelDecorator");
var Pointer_1 = require("../../Pointer/Pointer");
var URI_1 = require("../../RDF/URI");
var ResolvablePointer_1 = require("../../Repository/ResolvablePointer");
var Utils_2 = require("../../Utils");
var TransientDocument_1 = require("../TransientDocument");
function __parseMemberParams(resource, args) {
    var params = Array.from(args);
    var uri = Utils_2.isString(params[0]) && Utils_2.isString(Pointer_1.Pointer.getID(params[1])) ?
        URI_1.URI.resolve(resource.$id, params.shift()) : resource.$id;
    return { uri: uri, params: params };
}
exports.LDPDocumentTrait = {
    PROTOTYPE: {
        create: function (uriOrChildren, childrenOrSlugsOrRequestOptions, slugsOrRequestOptions, requestOptions) {
            var _a;
            var _b = Utils_1._parseURIParams(this, uriOrChildren, arguments), _uri = _b._uri, _args = _b._args;
            return (_a = this.$repository).create.apply(_a, [_uri].concat(_args));
        },
        createAndRetrieve: function (uriOrChildren, childrenOrSlugsOrRequestOptions, slugsOrRequestOptions, requestOptions) {
            if (requestOptions === void 0) { requestOptions = {}; }
            var _a;
            var _b = Utils_1._parseURIParams(this, uriOrChildren, arguments), _uri = _b._uri, _args = _b._args;
            return (_a = this.$repository).createAndRetrieve.apply(_a, [_uri].concat(_args));
        },
        addMember: function (uriOrMember, memberOrOptions, requestOptions) {
            var _a;
            var _b = __parseMemberParams(this, arguments), uri = _b.uri, params = _b.params;
            return (_a = this.$repository).addMember.apply(_a, [uri].concat(params));
        },
        addMembers: function (uriOrMembers, membersOrOptions, requestOptions) {
            var _a;
            var _b = Utils_1._parseURIParams(this, uriOrMembers, arguments), _uri = _b._uri, _args = _b._args;
            return (_a = this.$repository).addMembers.apply(_a, [_uri].concat(_args));
        },
        removeMember: function (uriOrMember, memberOrOptions, requestOptions) {
            var _a;
            var _b = __parseMemberParams(this, arguments), uri = _b.uri, params = _b.params;
            return (_a = this.$repository).removeMember.apply(_a, [uri].concat(params));
        },
        removeMembers: function (uriOrMembersOrOptions, membersOrOptions, requestOptions) {
            var _a;
            var _b = Utils_1._parseURIParams(this, uriOrMembersOrOptions, arguments), _uri = _b._uri, _args = _b._args;
            return (_a = this.$repository).removeMembers.apply(_a, [_uri].concat(_args));
        },
    },
    isDecorated: function (object) {
        return Utils_2.isObject(object)
            && ModelDecorator_1.ModelDecorator
                .hasPropertiesFrom(exports.LDPDocumentTrait.PROTOTYPE, object);
    },
    decorate: function (object) {
        if (exports.LDPDocumentTrait.isDecorated(object))
            return object;
        var target = ModelDecorator_1.ModelDecorator
            .decorateMultiple(object, TransientDocument_1.TransientDocument, ResolvablePointer_1.ResolvablePointer);
        return ModelDecorator_1.ModelDecorator
            .definePropertiesFrom(exports.LDPDocumentTrait.PROTOTYPE, target);
    },
};

//# sourceMappingURL=LDPDocumentTrait.js.map
