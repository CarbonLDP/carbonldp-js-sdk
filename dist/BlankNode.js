"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Fragment = require("./Fragment");
var NS = require("./NS");
var RDF = require("./RDF");
var Utils = require("./Utils");
exports.SCHEMA = {
    "bNodeIdentifier": {
        "@id": NS.C.Predicate.bNodeIdentifier,
        "@type": NS.XSD.DataType.string,
    },
};
var Factory = (function () {
    function Factory() {
    }
    Factory.createFrom = function (object, idOrDocument, document) {
        var id = !!idOrDocument && Utils.isString(idOrDocument) ? idOrDocument : RDF.URI.Util.generateBNodeID();
        document = document || idOrDocument;
        var fragment = Fragment.Factory.createFrom(object, id, document);
        return Factory.decorate(fragment, fragment.bNodeIdentifier);
    };
    Factory.decorate = function (object, bNodeIdentifier) {
        if (bNodeIdentifier === void 0) { bNodeIdentifier = Utils.UUID.generate(); }
        var bNode = object;
        bNode.bNodeIdentifier = bNodeIdentifier;
        return bNode;
    };
    return Factory;
}());
exports.Factory = Factory;

//# sourceMappingURL=BlankNode.js.map
