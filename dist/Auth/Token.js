"use strict";
var NS = require("./../NS");
var Pointer = require("./../Pointer");
var Utils = require("./../Utils");
exports.RDF_CLASS = NS.CS.Class.Token;
exports.CONTEXT = {
    "key": {
        "@id": NS.CS.Predicate.tokenKey,
        "@type": NS.XSD.DataType.string,
    },
    "expirationTime": {
        "@id": NS.CS.Predicate.expirationTime,
        "@type": NS.XSD.DataType.dateTime,
    },
};
var Factory = (function () {
    function Factory() {
    }
    Factory.is = function (value) {
        return (Utils.isObject(value) &&
            Factory.hasClassProperties(value));
    };
    Factory.hasClassProperties = function (object) {
        return (Utils.hasPropertyDefined(object, "key") &&
            Utils.hasPropertyDefined(object, "expirationTime"));
    };
    Factory.decorate = function (object) {
        if (this.hasClassProperties(object))
            return object;
        return object;
    };
    Factory.hasRDFClass = function (pointerOrExpandedObject) {
        var types = [];
        if ("@type" in pointerOrExpandedObject) {
            types = pointerOrExpandedObject["@type"];
        }
        else if ("types" in pointerOrExpandedObject) {
            var resource = pointerOrExpandedObject;
            types = Pointer.Util.getIDs(resource.types);
        }
        return types.indexOf(exports.RDF_CLASS) !== -1;
    };
    return Factory;
}());
exports.Factory = Factory;

//# sourceMappingURL=Token.js.map
