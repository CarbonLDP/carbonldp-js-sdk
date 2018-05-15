"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("../core");
var Fragment_1 = require("../Fragment");
var Resource_1 = require("../Resource");
var TransientBlankNode_1 = require("./TransientBlankNode");
exports.BlankNode = {
    is: function (value) {
        return TransientBlankNode_1.TransientBlankNode.is(value)
            && Resource_1.PersistedResource.isDecorated(value);
    },
    create: TransientBlankNode_1.TransientBlankNode.create,
    createFrom: TransientBlankNode_1.TransientBlankNode.createFrom,
    decorate: function (object) {
        return core_1.ModelDecorator
            .decorateMultiple(object, TransientBlankNode_1.TransientBlankNode, Fragment_1.Fragment);
    },
};

//# sourceMappingURL=BlankNode.js.map
