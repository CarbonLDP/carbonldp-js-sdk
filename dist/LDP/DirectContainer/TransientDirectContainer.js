"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Document_1 = require("../../Document");
var Errors_1 = require("../../Errors");
var Vocabularies_1 = require("../../Vocabularies");
exports.TransientDirectContainer = {
    TYPE: Vocabularies_1.LDP.DirectContainer,
    is: function (value) {
        return Document_1.TransientDocument.is(value)
            && value.hasType(exports.TransientDirectContainer.TYPE)
            && value.hasOwnProperty("membershipResource");
    },
    create: function (data) {
        var copy = Object.assign({}, data);
        return exports.TransientDirectContainer.createFrom(copy);
    },
    createFrom: function (object) {
        if (exports.TransientDirectContainer.is(object))
            throw new Errors_1.IllegalArgumentError("The base object is already a DirectContainer.");
        if (!object.hasMemberRelation)
            throw new Errors_1.IllegalArgumentError("The property hasMemberRelation is required.");
        var container = Document_1.TransientDocument.is(object) ?
            object : Document_1.TransientDocument.createFrom(object);
        container.addType(exports.TransientDirectContainer.TYPE);
        return container;
    },
};

//# sourceMappingURL=TransientDirectContainer.js.map
