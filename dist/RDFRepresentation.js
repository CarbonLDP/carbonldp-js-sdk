"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
}
Object.defineProperty(exports, "__esModule", { value: true });
var PersistedDocument_1 = require("./PersistedDocument");
var Utils = __importStar(require("./Utils"));
var C_1 = require("./Vocabularies/C");
var XSD_1 = require("./Vocabularies/XSD");
exports.RDF_CLASS = C_1.C.RDFRepresentation;
exports.SCHEMA = {
    "mediaType": {
        "@id": C_1.C.mediaType,
        "@type": XSD_1.XSD.string,
    },
    "size": {
        "@id": C_1.C.size,
        "@type": XSD_1.XSD.long,
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
            && PersistedDocument_1.PersistedDocument.is(object)
            && object.hasType(exports.RDF_CLASS);
    };
    return Factory;
}());
exports.Factory = Factory;

//# sourceMappingURL=RDFRepresentation.js.map
