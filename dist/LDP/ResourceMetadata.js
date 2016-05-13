"use strict";
var NS = require("./../NS");
var Utils = require("./../Utils");
var VolatileResource = require("./VolatileResource");
exports.RDF_CLASS = NS.C.Class.ResourceMetadata;
exports.SCHEMA = {
    "eTag": {
        "@id": NS.C.Predicate.eTag,
        "@type": NS.XSD.DataType.string,
    },
    "resource": {
        "@id": NS.C.Predicate.resource,
        "@type": "@id",
    },
};
var Factory = (function () {
    function Factory() {
    }
    Factory.hasClassProperties = function (object) {
        return Utils.hasPropertyDefined(object, "eTag")
            && Utils.hasPropertyDefined(object, "resource");
    };
    Factory.is = function (object) {
        return VolatileResource.Factory.is(object)
            && Factory.hasClassProperties(object)
            && Factory.hasRDFClass(object);
    };
    Factory.hasRDFClass = function (object) {
        if (!object)
            return false;
        var types = ("@type" in object) ? object["@type"] : ("types" in object) ? object.types : [];
        return types.indexOf(exports.RDF_CLASS) !== -1;
    };
    return Factory;
}());
exports.Factory = Factory;

//# sourceMappingURL=ResourceMetadata.js.map
