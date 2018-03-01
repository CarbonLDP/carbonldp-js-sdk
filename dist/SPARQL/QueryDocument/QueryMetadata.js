"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var VolatileResource_1 = require("../../LDP/VolatileResource");
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
        return VolatileResource_1.VolatileResource.is(object)
            && object.hasType(exports.RDF_CLASS);
    };
    return Factory;
}());
exports.Factory = Factory;

//# sourceMappingURL=QueryMetadata.js.map
