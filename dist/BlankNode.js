"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Fragment = require("./Fragment");
var RDF = require("./RDF");
var Utils = require("./Utils");
var Factory = (function () {
    function Factory() {
    }
    Factory.createFrom = function (object, idOrDocument, document) {
        var id = !!idOrDocument && Utils.isString(idOrDocument) ? idOrDocument : RDF.URI.Util.generateBNodeID();
        document = document || idOrDocument;
        return Fragment.Factory.createFrom(object, id, document);
    };
    return Factory;
}());
exports.Factory = Factory;

//# sourceMappingURL=BlankNode.js.map
