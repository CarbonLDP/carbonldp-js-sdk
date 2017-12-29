"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NS = require("./../NS");
var VolatileResource = require("./VolatileResource");
exports.RDF_CLASS = NS.C.Class.ResponseMetadata;
exports.SCHEMA = {
    "documentsMetadata": {
        "@id": NS.C.Predicate.documentMetadata,
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

//# sourceMappingURL=ResponseMetadata.js.map
