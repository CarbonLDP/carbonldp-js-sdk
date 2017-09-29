"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NS = require("./../NS");
var Resource = require("./../Resource");
var Utils = require("./../Utils");
exports.RDF_CLASS = NS.CS.Class.Token;
exports.SCHEMA = {
    "key": {
        "@id": NS.CS.Predicate.tokenKey,
        "@type": NS.XSD.DataType.string,
    },
    "expirationTime": {
        "@id": NS.CS.Predicate.expirationTime,
        "@type": NS.XSD.DataType.dateTime,
    },
    "user": {
        "@id": NS.CS.Predicate.credentialsOf,
        "@type": "@id",
    },
};
var Factory = (function () {
    function Factory() {
    }
    Factory.is = function (value) {
        return (Resource.Factory.is(value)
            && Factory.hasClassProperties(value));
    };
    Factory.hasClassProperties = function (object) {
        return (Utils.hasPropertyDefined(object, "key")
            && Utils.hasPropertyDefined(object, "expirationTime")
            && Utils.hasPropertyDefined(object, "user"));
    };
    Factory.hasRequiredValues = function (object) {
        return (Utils.hasProperty(object, "key")
            && Utils.hasProperty(object, "expirationTime"));
    };
    Factory.decorate = function (object) {
        if (this.hasClassProperties(object))
            return object;
        return object;
    };
    return Factory;
}());
exports.Factory = Factory;

//# sourceMappingURL=Token.js.map
