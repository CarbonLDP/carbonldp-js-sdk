"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Errors_1 = require("./Errors");
var TransientFragment_1 = require("./TransientFragment");
var URI_1 = require("./RDF/URI");
exports.TransientBlankNode = {
    is: function (object) {
        return TransientFragment_1.TransientFragment.is(object) &&
            URI_1.URI.isBNodeID(object.id);
    },
    create: function (document, id) {
        return exports.TransientBlankNode.createFrom({}, document, id);
    },
    createFrom: function (object, document, id) {
        if (id && !URI_1.URI.isBNodeID(id))
            throw new Errors_1.IllegalArgumentError("The id \"" + id + "\" is not an blank node label");
        if (!id)
            id = URI_1.URI.generateBNodeID();
        return TransientFragment_1.TransientFragment.createFrom(object, document, id);
    },
};

//# sourceMappingURL=TransientBlankNode.js.map
