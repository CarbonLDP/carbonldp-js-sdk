"use strict";
var NS = require("./../NS");
var Utils = require("../Utils");
var VolatileResource = require("./VolatileResource");
exports.RDF_CLASS = NS.C.Class.ResponseDescription;
exports.SCHEMA = {
    "responseProperties": {
        "@id": NS.C.Predicate.responseProperty,
        "@type": "@id",
        "@container": "@set",
    },
};
var Factory = (function () {
    function Factory() {
    }
    Factory.hasClassProperties = function (object) {
        return Utils.hasPropertyDefined(object, "responseProperties");
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

//# sourceMappingURL=ResponseDescription.js.map
