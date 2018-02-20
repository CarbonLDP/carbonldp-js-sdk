"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
}
Object.defineProperty(exports, "__esModule", { value: true });
var C_1 = require("../Vocabularies/C");
var XSD_1 = require("../Vocabularies/XSD");
var Utils = __importStar(require("./../Utils"));
var VolatileResource = __importStar(require("./VolatileResource"));
exports.RDF_CLASS = C_1.C.DocumentMetadata;
exports.SCHEMA = {
    "relatedDocument": {
        "@id": C_1.C.relatedDocument,
        "@type": "@id",
    },
    "eTag": {
        "@id": C_1.C.eTag,
        "@type": XSD_1.XSD.string,
    },
    "bNodesMap": {
        "@id": C_1.C.bNodesMap,
        "@type": "@id",
    },
};
var Factory = (function () {
    function Factory() {
    }
    Factory.hasClassProperties = function (object) {
        return Utils.hasPropertyDefined(object, "relatedDocument");
    };
    Factory.is = function (object) {
        return VolatileResource.Factory.is(object)
            && Factory.hasClassProperties(object)
            && object.hasType(exports.RDF_CLASS);
    };
    return Factory;
}());
exports.Factory = Factory;

//# sourceMappingURL=DocumentMetadata.js.map
