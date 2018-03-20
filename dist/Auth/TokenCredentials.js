"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
}
Object.defineProperty(exports, "__esModule", { value: true });
var CS_1 = require("../Vocabularies/CS");
var XSD_1 = require("../Vocabularies/XSD");
var Resource_1 = require("./../Resource");
var Utils = __importStar(require("./../Utils"));
exports.RDF_CLASS = CS_1.CS.Token;
exports.SCHEMA = {
    "key": {
        "@id": CS_1.CS.tokenKey,
        "@type": XSD_1.XSD.string,
    },
    "expirationTime": {
        "@id": CS_1.CS.expirationTime,
        "@type": XSD_1.XSD.dateTime,
    },
    "user": {
        "@id": CS_1.CS.credentialsOf,
        "@type": "@id",
    },
};
var Factory = (function () {
    function Factory() {
    }
    Factory.is = function (object) {
        return Resource_1.Resource.is(object)
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
