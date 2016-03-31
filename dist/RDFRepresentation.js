"use strict";
var NS = require("./NS");
var PersistedDocument = require("./PersistedDocument");
var Utils = require("./Utils");
exports.RDF_CLASS = NS.C.Class.RDFRepresentation;
exports.SCHEMA = {
    "fileIdentifier": {
        "@id": NS.C.Predicate.fileIdentifier,
        "@type": NS.XSD.DataType.string,
    },
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
        return Utils.hasPropertyDefined(object, "fileIdentifier")
            && Utils.hasPropertyDefined(object, "mediaType")
            && Utils.hasPropertyDefined(object, "size");
    };
    Factory.is = function (object) {
        return PersistedDocument.Factory.is(object)
            && object.types.indexOf(exports.RDF_CLASS) !== -1
            && Factory.hasClassProperties(object);
    };
    return Factory;
}());
exports.Factory = Factory;

//# sourceMappingURL=RDFRepresentation.js.map
