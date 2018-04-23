"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Document_1 = require("../Document");
var IllegalArgumentError_1 = require("../Errors/IllegalArgumentError");
var LDP_1 = require("../Vocabularies/LDP");
exports.TransientDirectContainer = {
    TYPE: LDP_1.LDP.DirectContainer,
    is: function (object) {
        return Document_1.TransientDocument.is(object)
            && object.hasType(exports.TransientDirectContainer.TYPE)
            && object.hasOwnProperty("membershipResource");
    },
    create: function (membershipResource, hasMemberRelation, isMemberOfRelation) {
        return exports.TransientDirectContainer.createFrom({}, membershipResource, hasMemberRelation, isMemberOfRelation);
    },
    createFrom: function (object, membershipResource, hasMemberRelation, isMemberOfRelation) {
        if (exports.TransientDirectContainer.is(object))
            throw new IllegalArgumentError_1.IllegalArgumentError("The base object is already a DirectContainer.");
        if (!membershipResource)
            throw new IllegalArgumentError_1.IllegalArgumentError("The property membershipResource is required.");
        if (!hasMemberRelation)
            throw new IllegalArgumentError_1.IllegalArgumentError("The property hasMemberRelation is required.");
        var containerBase = Object.assign(object, {
            membershipResource: membershipResource,
            hasMemberRelation: hasMemberRelation,
        });
        var container = Document_1.TransientDocument.is(containerBase) ?
            containerBase : Document_1.TransientDocument.createFrom(containerBase);
        container.addType(exports.TransientDirectContainer.TYPE);
        if (isMemberOfRelation)
            container.isMemberOfRelation = isMemberOfRelation;
        return container;
    },
};

//# sourceMappingURL=TransientDirectContainer.js.map
