"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TransientDocument_1 = require("../../Document/TransientDocument");
var IllegalArgumentError_1 = require("../../Errors/IllegalArgumentError");
var LDP_1 = require("../../Vocabularies/LDP");
exports.TransientDirectContainer = {
    TYPE: LDP_1.LDP.DirectContainer,
    is: function (value) {
        return TransientDocument_1.TransientDocument.is(value)
            && value.hasType(exports.TransientDirectContainer.TYPE)
            && value.hasOwnProperty("membershipResource");
    },
    create: function (data) {
        var copy = Object.assign({}, data);
        return exports.TransientDirectContainer.createFrom(copy);
    },
    createFrom: function (object) {
        if (exports.TransientDirectContainer.is(object))
            throw new IllegalArgumentError_1.IllegalArgumentError("The base object is already a DirectContainer.");
        if (!object.hasMemberRelation)
            throw new IllegalArgumentError_1.IllegalArgumentError("The property hasMemberRelation is required.");
        var container = TransientDocument_1.TransientDocument.is(object) ?
            object : TransientDocument_1.TransientDocument.createFrom(object);
        container.addType(exports.TransientDirectContainer.TYPE);
        return container;
    },
};

//# sourceMappingURL=TransientDirectContainer.js.map
