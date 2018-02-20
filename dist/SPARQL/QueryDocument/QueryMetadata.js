"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
}
Object.defineProperty(exports, "__esModule", { value: true });
var VolatileResource = __importStar(require("../../LDP/VolatileResource"));
var C_1 = require("../../Vocabularies/C");
exports.RDF_CLASS = C_1.C.QueryMetadata;
exports.SCHEMA = {
    "target": {
        "@id": C_1.C.target,
        "@type": "@id",
        "@container": "@set",
    },
};
var Factory = (function () {
    function Factory() {
    }
    Factory.is = function (object) {
        return VolatileResource.Factory.is(object)
            && object.hasType(exports.RDF_CLASS);
    };
    return Factory;
}());
exports.Factory = Factory;

//# sourceMappingURL=QueryMetadata.js.map
