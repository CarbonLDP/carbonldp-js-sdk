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
            var _a = Utils_1._parseURIParams(this, uriOrChildren, arguments), _uri = _a._uri, _args = _a._args;
            return (_b = this.$repository).create.apply(_b, [_uri].concat(_args));
            var _b;
        },
        createAndRetrieve: function (uriOrChildren, childrenOrSlugsOrRequestOptions, slugsOrRequestOptions, requestOptions) {
            if (requestOptions === void 0) { requestOptions = {}; }
            var _a = Utils_1._parseURIParams(this, uriOrChildren, arguments), _uri = _a._uri, _args = _a._args;
            return (_b = this.$repository).createAndRetrieve.apply(_b, [_uri].concat(_args));
            var _b;
        },
        addMember: function (uriOrMember, memberOrOptions, requestOptions) {
            var _a = __parseMemberParams(this, arguments), uri = _a.uri, params = _a.params;
            return (_b = this.$repository).addMember.apply(_b, [uri].concat(params));
            var _b;
        },
        addMembers: function (uriOrMembers, membersOrOptions, requestOptions) {
            var _a = Utils_1._parseURIParams(this, uriOrMembers, arguments), _uri = _a._uri, _args = _a._args;
            return (_b = this.$repository).addMembers.apply(_b, [_uri].concat(_args));
            var _b;
        },
        removeMember: function (uriOrMember, memberOrOptions, requestOptions) {
            var _a = __parseMemberParams(this, arguments), uri = _a.uri, params = _a.params;
            return (_b = this.$repository).removeMember.apply(_b, [uri].concat(params));
            var _b;
        },
        removeMembers: function (uriOrMembersOrOptions, membersOrOptions, requestOptions) {
            var _a = Utils_1._parseURIParams(this, uriOrMembersOrOptions, arguments), _uri = _a._uri, _args = _a._args;
            return (_b = this.$repository).removeMembers.apply(_b, [_uri].concat(_args));
            var _b;
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
