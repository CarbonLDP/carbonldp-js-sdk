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
    Factory.is = function (object) {
        return Resource.Factory.is(object)
            && Factory.hasClassProperties(object);
    };
    Factory.hasClassProperties = function (object) {
        return Utils.hasPropertyDefined(object, "key")
            && Utils.hasPropertyDefined(object, "expirationTime");
    };
    return Factory;
}());
exports.Factory = Factory;

//# sourceMappingURL=TokenCredentials.js.map
