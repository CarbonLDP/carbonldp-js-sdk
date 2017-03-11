"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NS = require("./NS");
var PersistedDocument = require("./PersistedDocument");
var Utils = require("./Utils");
exports.RDF_CLASS = NS.C.Class.RDFRepresentation;
exports.SCHEMA = {
    "mediaType": {
        "@id": NS.C.Predicate.mediaType,
        "@type": NS.XSD.DataType.string,
    },
    "size": {
        "@id": NS.C.Predicate.size,
        "@type": NS.XSD.DataType.long,
    },
};
var Factory = (function () {
    function Factory() {
    }
    Factory.hasClassProperties = function (object) {
        return Utils.hasPropertyDefined(object, "mediaType")
            && Utils.hasPropertyDefined(object, "size");
    };
    Factory.is = function (object) {
        return Factory.hasClassProperties(object)
            && PersistedDocument.Factory.is(object)
            && object.hasType(exports.RDF_CLASS);
    };
    return Factory;
}());
exports.Factory = Factory;

//# sourceMappingURL=RDFRepresentation.js.map
