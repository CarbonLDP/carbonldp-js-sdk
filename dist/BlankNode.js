"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Errors_1 = require("./Errors");
var Fragment_1 = require("./Fragment");
var URI_1 = require("./RDF/URI");
exports.BlankNode = {
    is: function (object) {
        return Fragment_1.Fragment.is(object) &&
            URI_1.URI.isBNodeID(object.id);
    },
    create: function (document, id) {
        return exports.BlankNode.createFrom({}, document, id);
    },
    createFrom: function (object, document, id) {
        if (id && !URI_1.URI.isBNodeID(id))
            throw new Errors_1.IllegalArgumentError("The id \"" + id + "\" is not an blank node label");
        if (!id)
            id = URI_1.URI.generateBNodeID();
        return Fragment_1.Fragment.createFrom(object, document, id);
    },
};

//# sourceMappingURL=BlankNode.js.map
