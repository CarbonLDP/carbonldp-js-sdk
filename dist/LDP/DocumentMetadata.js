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
var Utils = __importStar(require("./../Utils"));
var VolatileResource = __importStar(require("./VolatileResource"));
exports.RDF_CLASS = NS.C.DocumentMetadata;
exports.SCHEMA = {
    "relatedDocument": {
        "@id": NS.C.relatedDocument,
        "@type": "@id",
    },
    "eTag": {
        "@id": NS.C.eTag,
        "@type": NS.XSD.string,
    },
    "bNodesMap": {
        "@id": NS.C.bNodesMap,
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
