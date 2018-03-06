"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Document_1 = require("../Document");
var IllegalArgumentError_1 = require("../Errors/IllegalArgumentError");
var LDP_1 = require("../Vocabularies/LDP");
exports.DirectContainer = {
    TYPE: LDP_1.LDP.DirectContainer,
    is: function (object) {
        return Document_1.Document.is(object)
            && object.hasType(exports.DirectContainer.TYPE)
            && object.hasOwnProperty("membershipResource");
    },
    create: function (membershipResource, hasMemberRelation, isMemberOfRelation) {
        return exports.DirectContainer.createFrom({}, membershipResource, hasMemberRelation, isMemberOfRelation);
    },
    createFrom: function (object, membershipResource, hasMemberRelation, isMemberOfRelation) {
        if (exports.DirectContainer.is(object))
            throw new IllegalArgumentError_1.IllegalArgumentError("The base object is already a DirectContainer.");
        if (!membershipResource)
            throw new IllegalArgumentError_1.IllegalArgumentError("The property membershipResource is required.");
        if (!hasMemberRelation)
            throw new IllegalArgumentError_1.IllegalArgumentError("The property hasMemberRelation is required.");
        var containerBase = Object.assign(object, {
            membershipResource: membershipResource,
            hasMemberRelation: hasMemberRelation,
        });
        var container = Document_1.Document.is(containerBase) ?
            containerBase : Document_1.Document.createFrom(containerBase);
        container.addType(exports.DirectContainer.TYPE);
        if (isMemberOfRelation)
            container.isMemberOfRelation = isMemberOfRelation;
        return container;
    },
};
exports.default = exports.DirectContainer;

//# sourceMappingURL=DirectContainer.js.map
