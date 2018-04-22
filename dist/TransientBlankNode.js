"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Errors_1 = require("./Errors");
var Fragment_1 = require("./Fragment");
var RDF_1 = require("./RDF");
exports.TransientBlankNode = {
    is: function (object) {
        return Fragment_1.TransientFragment.is(object) &&
            RDF_1.URI.isBNodeID(object.id);
    },
    create: function (document, id) {
        return exports.TransientBlankNode.createFrom({}, document, id);
    },
    createFrom: function (object, document, id) {
        if (id && !RDF_1.URI.isBNodeID(id))
            throw new Errors_1.IllegalArgumentError("The id \"" + id + "\" is not an blank node label");
        if (!id)
            id = RDF_1.URI.generateBNodeID();
        var base = Object.assign(object, {
            _document: document,
            id: id,
        });
        return Fragment_1.TransientFragment.createFrom(base);
    },
};

//# sourceMappingURL=TransientBlankNode.js.map
