"use strict";
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
            && Utils.hasPropertyDefined(object, "size")
            && Utils.hasPropertyDefined(object, "download");
    };
    Factory.is = function (object) {
        return PersistedDocument.Factory.is(object)
            && object.types.indexOf(exports.RDF_CLASS) !== -1
            && Factory.hasClassProperties(object);
    };
    Factory.decorate = function (persistedDocument) {
        if (Factory.hasClassProperties(persistedDocument))
            return persistedDocument;
        Object.defineProperties(persistedDocument, {
            "download": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: download,
            },
        });
        return persistedDocument;
    };
    Factory.hasRDFClass = function (resourceOrExpandedObject) {
        var types = [];
        if ("@type" in resourceOrExpandedObject) {
            types = resourceOrExpandedObject["@type"];
        }
        else if ("types" in resourceOrExpandedObject) {
            var resource = resourceOrExpandedObject;
            types = resource.types;
        }
        return types.indexOf(exports.RDF_CLASS) !== -1;
    };
    return Factory;
}());
exports.Factory = Factory;
function download() {
    var that = this;
    return that._documents.download(that);
}

//# sourceMappingURL=RDFRepresentation.js.map
