"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
}
Object.defineProperty(exports, "__esModule", { value: true });
var NS = __importStar(require("./Vocabularies/index"));
var PersistedDocument = __importStar(require("./PersistedDocument"));
var Utils = __importStar(require("./Utils"));
exports.RDF_CLASS = NS.C.RDFRepresentation;
exports.SCHEMA = {
    "mediaType": {
        "@id": NS.C.mediaType,
        "@type": NS.XSD.string,
    },
    "size": {
        "@id": NS.C.size,
        "@type": NS.XSD.long,
    },
};
var Factory = (function () {
    function Factory() {
    }
    Factory.hasClassProperties = function (object) {
        return Utils.hasPropertyDefined(object, "mediaType")
            && Utils.hasPropertyDefined(object, "size");
    };
    Factory.is = function (object) {
        return Factory.hasClassProperties(object)
            && PersistedDocument.Factory.is(object)
            && object.hasType(exports.RDF_CLASS);
    };
    return Factory;
}());
exports.Factory = Factory;

//# sourceMappingURL=RDFRepresentation.js.map
