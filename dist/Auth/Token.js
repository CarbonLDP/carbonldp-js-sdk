"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
}
Object.defineProperty(exports, "__esModule", { value: true });
var NS = __importStar(require("../Vocabularies/index"));
var Resource = __importStar(require("./../Resource"));
var Utils = __importStar(require("./../Utils"));
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
